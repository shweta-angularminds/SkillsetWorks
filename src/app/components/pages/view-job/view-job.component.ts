import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Job } from '../../../../constants/interfaces/job.interface';
import {
  apply_job_url,
  employer_job_base_url,
  employer_url,
  get_job_by_company,
  view_all_applications_url,
} from '../../../../constants/url/urls';
import { HttpService } from '../../../services/http.service';
import { employer } from '../../../../constants/interfaces/employer.interface';
import { LocalstorageService } from '../../../services/localstorage.service';
import { NotifyService } from '../../../services/notify.service';
import { DateDiffPipe } from '../../../pipes/date-diff.pipe';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { Application } from '../../../../constants/interfaces/application.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.css',
  imports: [DateDiffPipe, CommonModule, RouterLink, NavbarComponent],
})
export class ViewJobComponent implements OnInit, OnDestroy {
  id!: string;
  job: Job | null = null;
  employer: employer | null = null;
  jobs: Job[] = [];
  isApplied: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private http: HttpService,
    private localstorage: LocalstorageService,
    private notify: NotifyService,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.id = params['id'];
        if (!this.id) {
          this.route.navigateByUrl('/home');
          return;
        }
        this.loadData();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============================ LOAD ======================
  loadData(): void {
    this.getJobDetails();
    this.checkJobApply();
  }

  // ============================ JOB =========================
  getJobDetails(): void {
    this.http
      .get<Job>(`${employer_job_base_url}/${this.id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.job = res;
          this.getEmployerDetails(res.employer_id);
        },
        error: (error) => {},
      });
  }

  // ============================ EMPLOYER =======================
  getEmployerDetails(employerId: string): void {
    this.http
      .get<employer>(`${employer_url}/${employerId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.employer = res;
          this.getAllJobsOfCompany(employerId);
        },
        error: (err: any) => {},
      });
  }

  // ============================== RELATED JOBS =================
  getAllJobsOfCompany(employerId: string): void {
    this.http
      .get<Job[]>(`${get_job_by_company}${employerId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.jobs = res.filter((job) => job._id !== this.id);
        },
        error: (error: any) => {},
      });
  }

  //================================ APPLICATION CHECK ============
  checkJobApply(): void {
    const user = this.localstorage.getItem('userID');
    if (!user) {
      this.isApplied = false;
      return;
    }

    this.http
      .get<Application[]>(`${view_all_applications_url}${user}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.isApplied = res.some((item) => item.job_id === this.id);
        },
        error: () => {
          this.isApplied = false;
        },
      });
  }
  // ================================= APPLY =====================
  applyJob(): void {
    const token = this.localstorage.getItem('userToken');
    if (!token) {
      this.route.navigateByUrl('/auth/login/jobseeker');
      return;
    }
    const user_Id = this.localstorage.getItem('userID');

    const data = {
      job_Id: this.id,
      user_Id: user_Id,
    };
    this.http.post(apply_job_url, data).subscribe({
      next: () => {
        this.notify.notifyMessage('success', 'You applied job successfully!');
        this.isApplied = true;
      },
      error: (error) => {
        this.notify.notifyMessage('error', error.message);
      },
    });
  }
}
