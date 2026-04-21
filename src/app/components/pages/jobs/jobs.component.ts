import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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

  private serachSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.setupSearch();
    this.searchJobs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ========================= SEARCH HANDLER ====================
  setupSearch(): void {
    this.serachSubject
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe(() => {
        this.searchJobs();
      });
  }

  onSearchChange(): void {
    this.serachSubject.next();
  }

  // ================================= API ==========================
  searchJobs(): void {
    const params = this.buildQueryParams();

    this.http
      .get<{ data: Job[] }>(get_all_jobs, { params })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.jobs = res.data || [];
        },
        error: () => {
          this.jobs = [];
        },
      });
  }

  // ================= HELPERS =================
  buildQueryParams(): HttpParams {
    let params = new HttpParams();

    const query = {
      search: this.searchTerm,
      ...this.filters,
    };

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
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

    this.searchJobs();
  }
}
