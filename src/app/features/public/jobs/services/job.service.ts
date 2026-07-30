import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { Observable } from 'rxjs';
import { Job } from '../../../../core/constants/interfaces/job.interface';
import { buildParams } from '../../../../shared/utils/buildParameter';
import { URLS } from '../../../../core/constants/url/urls';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private readonly http: HttpService) {}

  getJobs(filters: {
    search?: string;
    location?: string;
    experience?: string;
    employementType?: string;
    page: number;
    limit: number;
  }): Observable<{ data: Job[] }> {
    return this.http.get<{ data: Job[] }>(URLS.jobs.all, {
      params: buildParams(filters),
    });
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(URLS.jobs.getById(id));
  }

  getJobsByCompany(companyId: string): Observable<Job[]> {
    return this.http.get<Job[]>(URLS.companies.view(companyId));
  }
}
