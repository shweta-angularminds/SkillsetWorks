import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import {
  Employer,
  EmployerListResponse,
} from '../../../../core/constants/interfaces/employer.interface';
import { map, Observable } from 'rxjs';
import { Job } from '../../../../core/constants/interfaces/job.interface';
import { URLS } from '../../../../core/constants/url/urls';
import { buildParams } from '../../../../shared/utils/buildParameter';
import { ApiResponse } from '../../../../core/constants/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private http: HttpService) {}

  getCompanies(filters: {
    page: number;
    limit: number;
    search?: string;
  }): Observable<EmployerListResponse> {
    return this.http.get<EmployerListResponse>(URLS.companies.all, {
      params: buildParams(filters),
    });
  }

  getCompanyById(id: string): Observable<Employer> {
    return this.http
      .get<ApiResponse<Employer>>(URLS.companies.profile(id))
      .pipe(map((res) => res.data));
  }

  getJobsByCompany(
    id: string,
    filters: {
      department?: string;
      experience?: string;
      limit?: number;
    },
  ): Observable<Job[]> {
    return this.http.get<Job[]>(URLS.companies.view(id), {
      params: buildParams(filters),
    });
  }
}
