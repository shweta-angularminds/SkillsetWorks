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

import { ScrollingModule } from '@angular/cdk/scrolling';

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
    ScrollingModule,
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

  chunkedJobs: Job[][] = [];

  private serachSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.setupSearch();
    this.searchJobs();
    window.addEventListener('resize', () => {
      this.updateChunkedJobs();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ========================= SEARCH HANDLER ====================
  setupSearch(): void {
    this.serachSubject
      .pipe(debounceTime(800), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.searchTerm = value.trim();
        this.searchJobs();
      });
  }

  onSearchChange(value: string): void {
    this.serachSubject.next(value);
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
          this.updateChunkedJobs();
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

  // ==================================== Scroll Virtualization =================================
  private chunkArray(arr: Job[], size: number): Job[][] {
    const result: Job[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
  getChunkSize(): number {
    const width = window.innerWidth;

    if (width < 768) return 1; // mobile
    if (width < 992) return 2; // tablet
    return 3; // desktop
  }
  updateChunkedJobs() {
    const size = this.getChunkSize();
    this.chunkedJobs = this.chunkArray(this.jobs, size);
  }
}
