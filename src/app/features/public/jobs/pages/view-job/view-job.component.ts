import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, EMPTY, forkJoin } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';

import { DateDiffPipe } from '../../../../../shared/pipes/date-diff.pipe';
import { NavbarComponent } from '../../../../../shared/components/navbar/navbar.component';

import { Job } from '../../../../../core/constants/interfaces/job.interface';
import { Employer } from '../../../../../core/constants/interfaces/employer.interface';

import { NotifyService } from '../../../../../core/services/notify.service';
import { LocalstorageService } from '../../../../../core/services/localstorage.service';

import { JobService } from '../../services/job.service';
import { CompaniesService } from '../../../companies/services/companies.service';
import { ApplicationService } from '../../../../applications/services/application.service';

@Component({
  standalone: true,
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.css',
  imports: [CommonModule, RouterLink, NavbarComponent, DateDiffPipe],
})
export class ViewJobComponent implements OnInit, OnDestroy {
  job: Job | null = null;
  employer: Employer | null = null;
  relatedJobs: Job[] = [];

  isApplied = false;
  isLoading = false;

  private jobId = '';

  private readonly destroy$ = new Subject<void>();

  private readonly jobsService = inject(JobService);
  private readonly companiesService = inject(CompaniesService);
  private readonly applicationsService = inject(ApplicationService);

  private readonly notify = inject(NotifyService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly localStorage = inject(LocalstorageService);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((paramMap) => {
      const id = paramMap.get('id');

      if (!id) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.jobId = id;

      this.loadPage();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ======================= PAGE =======================

  private loadPage(): void {
    this.isLoading = true;

    this.loadJob();

    this.checkApplicationStatus();
  }

  // ======================= JOB =======================

  private loadJob(): void {
    this.jobsService
      .getJobById(this.jobId)
      .pipe(
        tap((job) => (this.job = job)),

        switchMap((job) =>
          forkJoin({
            company: this.companiesService.getCompanyById(job.employer_id),
            jobs: this.jobsService.getJobsByCompany(job.employer_id),
          }),
        ),

        takeUntil(this.destroy$),

        catchError(() => {
          this.notify.notifyMessage('error', 'Unable to load job details.');

          this.router.navigateByUrl('/jobs');

          return EMPTY;
        }),
      )
      .subscribe(({ company, jobs }) => {
        this.employer = company;

        this.relatedJobs = jobs.filter((job) => job._id !== this.jobId);

        this.isLoading = false;
      });
  }

  // ======================= CHECK APPLICATION =======================

  private checkApplicationStatus(): void {
    if (!this.localStorage.isLoggedIn('jobseekerToken')) {
      return;
    }

    this.applicationsService
      .checkApplication(this.jobId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isApplied = response.isApplied;
        },
        error: () => {
          this.isApplied = false;
        },
      });
  }

  // ======================= APPLY =======================

  applyJob(): void {
    if (!this.localStorage.isLoggedIn('jobseekerToken')) {
      this.router.navigateByUrl('/auth/login/jobseeker');
      return;
    }

    this.applicationsService
      .apply(this.jobId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isApplied = true;

          this.notify.notifyMessage('success', 'You applied successfully.');
        },
      });
  }

  // ======================= TRACK BY =======================

  trackByJobId(index: number, job: Job): string {
    return job._id;
  }
}
