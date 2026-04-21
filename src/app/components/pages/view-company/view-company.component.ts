import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployerModule } from '../employer/employer.module';
import { employer } from '../../../../constants/interfaces/employer.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import {
  base_url,
  employer_url,
  get_job_by_company,
} from '../../../../constants/url/urls';
import { Job } from '../../../../constants/interfaces/job.interface';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateDiffPipe } from '../../../pipes/date-diff.pipe';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrl: './view-company.component.css',
  imports: [
    CommonModule,
    NgxPaginationModule,
    DateDiffPipe,
    RouterLink,
    NavbarComponent,
  ],
})
export class ViewCompanyComponent implements OnInit, OnDestroy {
  //Pagination
  p: number = 1;

  //Data
  company: employer | null = null;
  jobs: Job[] = [];

  //Route
  id!: string;

  //Filters
  filters = {
    department: '',
    experience: '',
    limit: 10,
  };

  //UI state
  isClick: Boolean = false;

  //Dropdown Data
  uniqueDepartments: string[] = [];
  uniqueExperiences: string[] = [];

  //Cleanup
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private http: HttpService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.id = params['id'];
        if (!this.id) {
          this.route.navigateByUrl('/companies');
        }
        this.loadData();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ========================== MAIN LOAD =======================
  loadData(): void {
    this.getEmployerData();
    this.getJobs();
  }

  // ========================== API CALLS ========================
  getEmployerData(): void {
    this.http.get<employer>(`${employer_url}/${this.id}`).subscribe({
      next: (res) => {
        this.company = res;
      },
      error: (err: any) => {},
    });
  }
  getJobs(): void {
    const params = this.buildQueryParams();

    this.http
      .get<Job[]>(`${get_job_by_company}${this.id}`, { params })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.jobs = res || [];
          this.extractFilters();
        },
        error: (err) => {
          if (err.status === 404) {
            this.jobs = [];
          }
        },
      });
  }
  // ================= HELPERS =================
  buildQueryParams(): HttpParams {
    let params = new HttpParams();

    Object.entries(this.filters).forEach(([key, value]) => {
      if (value) {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }

  extractFilters(): void {
    this.uniqueDepartments = [...new Set(this.jobs.map((j) => j.department))];
    this.uniqueExperiences = [...new Set(this.jobs.map((j) => j.experience))];
  }
  // ================= FILTER HANDLING =================
  setFilter(key: 'department' | 'experience', value: string): void {
    this.filters[key] = value || '';
    this.getJobs();
  }

  clearFilters(): void {
    this.filters.department = '';
    this.filters.experience = '';
    this.getJobs();
  }
}
