import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Job } from '../../../../constants/interfaces/job.interface';
import {
  apply_job_url,
  base_url,
  employer_job_base_url,
  employer_url,
  get_job_by_company,
  profile_url,
  view_all_applications_url,
} from '../../../../constants/url/urls';
import { HttpService } from '../../../services/http.service';
import { employer } from '../../../../constants/interfaces/employer.interface';
import { LocalstorageService } from '../../../services/localstorage.service';
import { NotifyService } from '../../../services/notify.service';
import { DateDiffPipe } from "../../../pipes/date-diff.pipe";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../partials/navbar/navbar.component";

@Component({
  standalone:true,
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.css',
  imports: [DateDiffPipe, CommonModule, RouterLink, NavbarComponent],

})
export class ViewJobComponent implements OnInit {
  id!: string;
  job: Job|null = null;
  employer: employer|null = null;
  jobs: Job[] = [];
  isApplied: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private http: HttpService,
    private localstorage: LocalstorageService,
    private notify: NotifyService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (!this.id) {
        this.route.navigateByUrl('/home');
      }
      this.getJobDetails();
      this.checkJobApply();
    });
  }

  checkJobApply() {
    const user = this.localstorage.getItem('userID');

    this.http.get(view_all_applications_url + user).subscribe({
      next: (res: any[]) => {
        const jobItem = res.find((item: any) => item.job_id === this.id);

        if (jobItem) {
          this.isApplied = true;
        } else {
          this.isApplied = false;
        }
      },
      error: (err: any) => {
      },
    });
  }

  getJobDetails() {
    this.http.get(employer_job_base_url + '/' + this.id).subscribe({
      next: (res: Job) => {
        this.job = res;
        this.getEmployerDetails();
      },
      error: (error) => {
      },
    });
  }
  getEmployerDetails() {
    this.http.get(employer_url + '/' + this.job?.employer_id).subscribe({
      next: (res: any) => {
        this.employer = res;
        this.getAllJobsOfCompany();
      },
      error: (err: any) => {
      },
    });
  }
  getImageUrl(path: string): string {
    return base_url + path;
  }
  getAllJobsOfCompany() {
    this.http.get(get_job_by_company + this.job?.employer_id).subscribe({
      next: (res: any) => {
        this.jobs = res.filter((job: Job) => job._id !== this.id);
      },
      error: (error: any) => {
      },
    });
  }

  applyJob() {
    if (!this.localstorage.getItem('userToken')) {
      this.route.navigateByUrl('/auth/login/jobseeker');
    }
    const user_Id = this.localstorage.getItem('userID');
    const resume = '';
    const data = {
      job_Id: this.id,
      user_Id: user_Id,
    };
    this.http.post(apply_job_url, data).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'You applied job successfully!');
        window.location.reload();
      },
      error: (error: any) => {
        this.notify.notifyMessage('error', error.message);
      },
    });
  }
}
