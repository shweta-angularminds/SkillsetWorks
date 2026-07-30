import { Injectable } from '@angular/core';
import { URLS } from '../../../core/constants/url/urls';
import { HttpService } from '../../../core/services/http.service';
import { ApplicationFilters } from '../application-filter.interface';
import {
  ApplicationListResponse,
  JobApplicantsResponse,
} from '../../../core/constants/interfaces/application.interface';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../../core/constants/interfaces/user.interface';

const JOBSEEKER_TOKEN = 'jobseekerToken';
const EMPLOYER_TOKEN = 'employerToken';
@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private readonly http: HttpService) {}

  checkApplication(jobId: string) {
    return this.http.secureGet<{ isApplied: boolean }>(
      URLS.applications.check(jobId),
      JOBSEEKER_TOKEN,
    );
  }

  apply(jobId: string) {
    return this.http.securePost(
      URLS.applications.apply,
      {
        job_Id: jobId,
      },
      JOBSEEKER_TOKEN,
    );
  }

  getApplications(
    filters: ApplicationFilters,
  ): Observable<ApplicationListResponse> {
    return this.http.secureGet<ApplicationListResponse>(
      URLS.applications.all,
      JOBSEEKER_TOKEN,
      filters,
    );
  }

  getJobApplicants(
    jobId: string,
    status?: string,
  ): Observable<JobApplicantsResponse> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }

    return this.http.secureGet<JobApplicantsResponse>(
      URLS.applications.applicants(jobId),
      EMPLOYER_TOKEN,
      params,
    );
  }

  updateApplicationStatus(
    applicationId: string,
    status: string,
  ): Observable<ApiResponse<null>> {
    return this.http.securePut<ApiResponse<null>>(
      URLS.applications.updateStatus(applicationId),
      {
        status,
      },
      EMPLOYER_TOKEN,
    );
  }
}
