import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Applicant,
  JobApplicantsResponse,
  TotalApplicants,
} from '../../../../core/constants/interfaces/applicant.interface';
import { JobInfo } from '../../../../core/constants/interfaces/application.interface';

import { NotifyService } from '../../../../core/services/notify.service';
import { ApplicationService } from '../../../applications/services/application.service';

import { showError } from '../../../../shared/utils/errorHandler';

declare var bootstrap: any;

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css',
})
export class ApplicantsComponent implements OnInit {
  p = 1;

  jobId!: string;
  pdfFilePath = '';

  selectedValue = '';
  selectOptions: string[] = ['all'];

  applicants: Applicant[] = [];
  job!: JobInfo;

  statusCounts = {
    approved: 0,
    pending: 0,
    rejected: 0,
    shortlisted: 0,
  };

  response!: JobApplicantsResponse;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notify = inject(NotifyService);
  private readonly applicationService = inject(ApplicationService);

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (!this.isValidObjectId(id)) {
        this.router.navigateByUrl('/employer/dashboard');
        return;
      }

      this.jobId = id;
      this.loadApplicants();
    });
  }

  private loadApplicants(): void {
    this.applicationService
      .getJobApplicants(this.jobId, this.selectedValue)
      .subscribe({
        next: (response) => {
          this.response = response;
          this.job = response.job;
          this.applicants = response.applicants;
          this.updateStatusSummary(response.totalApplicants);
        },
        error: (err) => showError(this.notify, err),
      });
  }

  changeStatus(status: string, applicationId: string): void {
    this.applicationService
      .updateApplicationStatus(applicationId, status)
      .subscribe({
        next: () => this.loadApplicants(),
        error: (err) => showError(this.notify, err),
      });
  }

  selectOption(value: string): void {
    this.selectedValue = value === 'all' ? '' : value;
    this.loadApplicants();
  }

  openPdf(path: string): void {
    this.pdfFilePath = path;

    const modal = new bootstrap.Modal(document.getElementById('pdfViewModal'));

    modal.show();
  }

  trackByApplicantId(_: number, applicant: Applicant): string {
    return applicant._id;
  }

  private updateStatusSummary(data: TotalApplicants[]): void {
    this.statusCounts = {
      approved: 0,
      pending: 0,
      rejected: 0,
      shortlisted: 0,
    };

    this.selectOptions = ['all'];

    if (!data.length) {
      return;
    }

    for (const item of data[0].statusCounts) {
      if (item._id in this.statusCounts) {
        this.statusCounts[item._id as keyof typeof this.statusCounts] =
          item.count;
      }

      this.selectOptions.push(item._id);
    }
  }

  private isValidObjectId(id: string): boolean {
    return /^[a-f\d]{24}$/i.test(id);
  }
}
