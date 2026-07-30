import { Component, inject, OnInit, ViewChild } from '@angular/core';

import {
  Job,
  JobSummary,
} from '../../../../core/constants/interfaces/job.interface';

import { NotifyService } from '../../../../core/services/notify.service';
import { EmployerService } from '../../services/employer.service';

import { showError } from '../../../../shared/utils/errorHandler';
import {
  JobFormModalComponent,
  JobFormSaveEvent,
} from '../job-form-modal/job-form-modal.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.css',
})
export class JobComponent implements OnInit {
  @ViewChild(JobFormModalComponent) formModal!: JobFormModalComponent;

  jobs: Job[] = [];

  summary: JobSummary = {
    totalJobs: 0,
    totalApplicants: 0,
    totalShortlisted: 0,
  };

  private readonly notify = inject(NotifyService);
  private readonly employerService = inject(EmployerService);

  ngOnInit(): void {
    this.getActiveJobs();
  }

  getActiveJobs(): void {
    this.employerService.getActiveJobs().subscribe({
      next: ({ jobs, summary }) => {
        this.jobs = jobs;
        this.summary = summary;
      },
      error: (err) => showError(this.notify, err),
    });
  }
  
  onAddJob(): void {
    this.formModal.openForCreate();
  }

  onEditJob(job: Job): void {
    this.formModal.openForEdit(job);
  }

  onDeleteJob(id: string): void {
    this.notify.confirmDelete().subscribe((result) => {
      if (result.isConfirmed) {
        this.deleteJob(id);
      }
    });
  }

  onSaveJob({ payload, jobId }: JobFormSaveEvent): void {
    const request$ = jobId
      ? this.employerService.updateJob(jobId, payload)
      : this.employerService.createJob(payload);

    request$.subscribe({
      next: () => {
        this.notify.notifyMessage(
          'success',
          jobId ? 'Job updated successfully!' : 'Job added successfully!',
        );
        this.getActiveJobs();
        this.formModal.closeModal();
      },
      error: (err) => showError(this.notify, err),
    });
  }

  private deleteJob(id: string): void {
    this.employerService.deleteJob(id).subscribe({
      next: ({ message }) => {
        this.notify.notifyMessage('success', message);
        this.getActiveJobs();
      },
      error: (err) => showError(this.notify, err),
    });
  }
}
