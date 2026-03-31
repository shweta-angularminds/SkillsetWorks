import { Component, OnInit } from '@angular/core';
import { EmployerModule } from '../employer/employer.module';
import { employer } from '../../../../constants/interfaces/employer.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import {
  base_url,
  employer_url,
  get_job_by_company,
} from '../../../../constants/url/urls';
import { Job } from '../../../../constants/interfaces/job.interface';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrl: './view-company.component.css',
})
export class ViewCompanyComponent implements OnInit {
  p: number = 1;
  company!: employer;
  jobs!: Job[];
  id!: string;
  department: string = '';
  limit: number = 10;
  experience: string = '';
  isClick: Boolean = false;
  uniqueDepartments: string[] = [];
  uniqueExperiences: string[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private http: HttpService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];

      this.getEmployerData();
      this.getJobs();
    });
    if (!this.id) {
      this.route.navigateByUrl('/companies');
    }
  }

  getEmployerData() {
    this.http.get(employer_url + '/' + this.id).subscribe({
      next: (res: any) => {
        this.company = res;
      },
      error: (err: any) => {
      },
    });
  }
  getJobs() {
    let params = new HttpParams();

    if (this.experience) {
      params = params.set('experience', this.experience);
    }
    if (this.department) {
      params = params.set('department', this.department);
    }
    if (this.limit) {
      params = params.set('limit', this.limit.toString());
    }
    this.http.get(get_job_by_company + this.id, { params }).subscribe({
      next: (res: any) => {
        this.jobs = res;

        this.getUniqueDepartments();
        this.getUniqueExperiences();
      },
      error: (err: any) => {
        if (err.status === 404) {
          this.jobs = [];
        }
    
      },
    });
  }
  setQuery(key: string, value: string) {
    if (key === 'experience') {
      if (value !== '') {
        this.experience = value;
        this.getJobs();
      } else {
        this.experience = '';
        this.getJobs();
      }
    } else if (key === 'department') {
      if (value !== '') {
        this.department = value;
        this.getJobs();
      } else {
        this.department = '';
        this.getJobs();
      }
    } else {
      this.experience = '';
      this.department = '';
      this.getJobs();
    }
  }
  getImageUrl(path: string): string {
    return base_url + path;
  }
  getUniqueDepartments() {
    this.uniqueDepartments = [
      ...new Set(this.jobs.map((job) => job.department)),
    ];
  }
  getUniqueExperiences() {
    this.uniqueExperiences = [
      ...new Set(this.jobs.map((job) => job.experience)),
    ];
  }
}
