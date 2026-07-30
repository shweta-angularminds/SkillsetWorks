import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Subject, debounceTime, finalize, takeUntil } from 'rxjs';

import { NavbarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { DateDiffPipe } from '../../../../../shared/pipes/date-diff.pipe';

import { Job } from '../../../../../core/constants/interfaces/job.interface';
import { JobService } from '../../services/job.service';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.css',
  imports: [
    NavbarComponent,
    RouterLink,
    NgIf,
    NgFor,
    FormsModule,
    DateDiffPipe,
    TitleCasePipe,
  ],
})
export class JobsListComponent implements OnInit, OnDestroy {
  private readonly jobsService = inject(JobService);

  jobs: Job[] = [];

  searchTerm: string = '';

  filters = {
    location: '',
    experience: '',
    employementType: '',
  };

  page = 1;
  readonly limit = 9;

  isLoading = false;
  hasMore = true;

  private serachSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.setupSearch();
    this.fetchJobs(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============================= INFINITE SCROLL ========================
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;

    if (scrollPosition >= threshold && !this.isLoading && this.hasMore) {
      this.fetchJobs();
    }
  }

  // ========================= SEARCH HANDLER ====================
  private setupSearch(): void {
    this.serachSubject
      .pipe(debounceTime(800), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.searchTerm = value.trim();
        this.fetchJobs(true);
      });
  }

  onSearchChange(value: string): void {
    this.serachSubject.next(value);
  }

  // ================================= API ==========================
  fetchJobs(isNewSearch = false): void {
    if (this.isLoading || (!this.hasMore && !isNewSearch)) return;

    this.isLoading = true;

    if (isNewSearch) {
      this.page = 1;
      this.jobs = [];
      this.hasMore = true;
    }

    this.jobsService
      .getJobs({
        search: this.searchTerm,
        ...this.filters,
        page: this.page,
        limit: this.limit,
      })
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          const newJobs = response.data ?? [];

          this.jobs.push(...newJobs);

          // if less than limit → no more data
          if (newJobs.length < this.limit) {
            this.hasMore = false;
          } else {
            this.page++;
          }
          this.isLoading = false;
        },
      });
  }

  // ==================================== FILTERS ================
  clearFilters(): void {
    this.searchTerm = '';
    this.filters = {
      location: '',
      experience: '',
      employementType: '',
    };

    this.fetchJobs(true);
  }

  // ===================================== TRACK BY ================
  trackById(index: number, item: Job) {
    return item._id;
  }
}
