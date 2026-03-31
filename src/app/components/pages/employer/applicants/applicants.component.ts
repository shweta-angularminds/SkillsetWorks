import { HttpParams, HttpSentEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import {
  base_url,
  get_all_applications_url,
  update_application_status_url,
} from '../../../../../constants/url/urls';

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
  applicants: any;
  pageNumber: number = 1;
  jobId!: string;
  Job: any;
  pdfFilePath!: string;
  res: any;
  selectedValue: string = '';
  selectOptions: string[] = ['all'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.jobId = params['id'];

      if (!this.jobId) {
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
    this.http.get(get_all_applications_url + this.jobId, { params }).subscribe({
      next: (res: any) => {
        this.res = res;
        this.applicants = res.applicants;
        this.Job = res.Job;
        res.totalApplicants[0].statusCounts.forEach((item: any) => {
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
      },
      error: (error: any) => {
       
      },
    });
  }
  openPdf(path: string) {
    this.pdfFilePath = path;

    const myModalElement = document.getElementById('pdfViewModal');
    const myModal = new bootstrap.Modal(myModalElement);
    myModal.show();
  }
  getPdfUrl(path: string) {
    return base_url + path;
  }
  changeStatus(status: string, Id: string) {
    const data = {
      status: status,
      application_Id: Id,
    };

    this.http.securePut(update_application_status_url, data).subscribe({
      next: (res: any) => {
        this.getAllApplicants();
      },
      error: (err: any) => {
        
      },
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
}
