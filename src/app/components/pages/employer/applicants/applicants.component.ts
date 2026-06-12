import { HttpParams, HttpSentEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import {
  base_url,
  get_all_applications_url,
  update_application_status_url,
} from '../../../../../constants/url/urls';
import {
  Applicant,
  JobApplicantsResponse,
  JobDetail,
  StatusCount,
} from '../../../../../constants/interfaces/applicant.interface';

declare var bootstrap: any;

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css',
})
export class ApplicantsComponent implements OnInit {
  p: number = 1;

  approved: number = 0;
  pending: number = 0;
  rejected: number = 0;
  shortlisted: number = 0;

  applicants: Applicant[] = [];

  pageNumber: number = 1;
  jobId!: string;

  Job!: JobDetail;
  pdfFilePath!: string;

  JobApplicants!: JobApplicantsResponse;

  selectedValue: string = '';
  selectOptions: string[] = ['all'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.jobId = params['id'];
      if (!this.jobId || !/^[a-f\d]{24}$/i.test(this.jobId)) {
        this.router.navigateByUrl('/employer/dashboard');
      } else {
        this.getAllApplicants();
      }
    });
  }

  getAllApplicants() {
    let params = new HttpParams();

    if (this.selectedValue) {
      params = params.set('status', this.selectedValue); // Add status if it's provided
    }
    this.approved = 0;
    this.pending = 0;
    this.rejected = 0;
    this.shortlisted = 0;

    this.selectOptions = ['all'];

    this.http
      .get<JobApplicantsResponse>(get_all_applications_url + this.jobId, {
        params,
      })
      .subscribe({
        next: (res) => {
          this.JobApplicants = res;
         
          this.applicants = res.applicants;
          this.Job = res.Job;
          
          if (res.totalApplicants?.length > 0) {
            res.totalApplicants[0].statusCounts.forEach((item: StatusCount) => {
              if (item._id === 'approved') {
                this.approved = item.count;
              } else if (item._id === 'pending') {
                this.pending = item.count;
              } else if (item._id === 'rejected') {
                this.rejected = item.count;
              } else if (item._id === 'shortlisted') {
                this.shortlisted = item.count;
              }

              if (!this.selectOptions.includes(item._id)) {
                this.selectOptions.push(item._id);
              }
            });
          }
        },
        error: (error: any) => {},
      });
  }
  openPdf(path: string) {
    this.pdfFilePath = path;

    const myModalElement = document.getElementById('pdfViewModal');
    const myModal = new bootstrap.Modal(myModalElement);
    myModal.show();
  }

  changeStatus(status: string, Id: string) {
    const data = {
      status: status,
      application_Id: Id,
    };

    this.http
      .securePut(update_application_status_url, data, 'authToken')
      .subscribe({
        next: (res: any) => {
          this.getAllApplicants();
        },
        error: (err: any) => {},
      });
  }

  selectOption(value: string): void {
    if (value === 'all') {
      this.selectedValue = '';
    } else {
      this.selectedValue = value;
    }

    this.getAllApplicants();
  }
  trackByApplicantId(index: number, item: Applicant): string {
    return item._id;
  }
}
