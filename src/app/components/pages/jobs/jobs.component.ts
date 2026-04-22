import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, SlicePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DateDiffPipe } from '../../../pipes/date-diff.pipe';
import { get_all_jobs } from '../../../../constants/url/urls';
import { Job } from '../../../../constants/interfaces/job.interface';
import { HttpParams } from '@angular/common/http';
import { debounceTime, Subject, takeUntil } from 'rxjs';



@Component({
  standalone: true,
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
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
export class JobsComponent implements OnInit, OnDestroy {
  private http = inject(HttpService);

  jobs: Job[] = [];

  searchTerm: string = '';

  filters = {
    location: '',
    experience: '',
    employementType: '',
  };

  page = 1;
  limit = 9; // 9 jobs (3x3 grid)
  isLoading = false;
  hasMore = true;

  private serachSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.setupSearch();
    this.searchJobs(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============================= window Scroller ========================
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;

    if (scrollPosition >= threshold && !this.isLoading && this.hasMore) {
      this.searchJobs();
    }
  }

  // ========================= SEARCH HANDLER ====================
  setupSearch(): void {
    this.serachSubject
      .pipe(debounceTime(800), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.searchTerm = value.trim();
        this.searchJobs(true);
      });
  }

  onSearchChange(value: string): void {
    this.serachSubject.next(value);
  }

  // ================================= API ==========================
  searchJobs(isNewSearch = false): void {
   if (this.isLoading || (!this.hasMore && !isNewSearch)) return;

   this.isLoading = true;

    if (isNewSearch) {
      this.page = 1;
      this.jobs = [];
      this.hasMore = true;
    }
    const params = this.buildQueryParams();

    this.http
      .get<{ data: Job[] }>(get_all_jobs, { params })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          const newJobs = res.data || [];

          this.jobs = [...this.jobs, ...newJobs];

          // if less than limit → no more data
          if (newJobs.length < this.limit) {
            this.hasMore = false;
          } else {
            this.page++;
          }
          this.isLoading = false; 
        },
        error: () => {
          this.isLoading = false; 
        },
      });
  }

  // ================= HELPERS =================
  buildQueryParams(): HttpParams {
    let params = new HttpParams();

    const query = {
      search: this.searchTerm,
      ...this.filters,
      page: this.page,
      limit: this.limit,
    };

    Object.entries(query).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        params = params.set(key, value);
      }
    });

    return params;
  }

  // ==================================== CLEAR ================
  clearFilters(): void {
    this.searchTerm = '';
    this.filters = {
      location: '',
      experience: '',
      employementType: '',
    };

    this.searchJobs(true);
  }

  trackById(index: number, item: Job) {
    return item._id;
  }
}
