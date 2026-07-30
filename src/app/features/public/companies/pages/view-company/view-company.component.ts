import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject, takeUntil } from 'rxjs';
import { DateDiffPipe } from '../../../../../shared/pipes/date-diff.pipe';
import { NavbarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { Employer } from '../../../../../core/constants/interfaces/employer.interface';
import { Job } from '../../../../../core/constants/interfaces/job.interface';
import { CompaniesService } from '../../services/companies.service';

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
  company: Employer | null = null;
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
  isClick: boolean = false;

  //Dropdown Data
  uniqueDepartments: string[] = [];
  uniqueExperiences: string[] = [];

  //Cleanup
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private companiesService: CompaniesService,
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
  private loadData(): void {
    this.getEmployerData();
    this.getJobs();
  }

  // ========================== API CALLS ========================
  private getEmployerData(): void {
    this.companiesService
      .getCompanyById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (company) => {
          this.company = company;
        },
      });
  }
  private getJobs(): void {
    this.companiesService
      .getJobsByCompany(this.id, this.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (jobs) => {
          this.jobs = jobs;
          this.extractFilters();
        },
      });
  }

  private extractFilters(): void {
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
