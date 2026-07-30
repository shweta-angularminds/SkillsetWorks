import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable, map } from 'rxjs';
import { ApiResponse, CandidateProfile } from '../../../core/constants/interfaces/user.interface';
import { URLS } from '../../../core/constants/url/urls';
import { ChangePasswordRequest, Employer } from '../../../core/constants/interfaces/employer.interface';
import { EmployerJobsResponse, Job, JobRequest } from '../../../core/constants/interfaces/job.interface';

const TOKEN_KEY = 'employerToken';
@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  constructor(private http: HttpService) {}
  getEmployerDetails(): Observable<Employer> {
    return this.http
      .secureGet<ApiResponse<Employer>>(URLS.employer.profile, TOKEN_KEY)
      .pipe(map((res) => res.data));
  }
  updateEmployerProfile(formData: FormData): Observable<ApiResponse<Employer>> {
    return this.http.securePut<ApiResponse<Employer>>(
      URLS.employer.profile,
      formData,
      TOKEN_KEY,
    );
  }
  updatePassword(payload: ChangePasswordRequest): Observable<ApiResponse<any>> {
    return this.http.securePut<ApiResponse<any>>(
      URLS.employer.changePassword,
      payload,
      'employerToken',
    );
  }
  getActiveJobs(): Observable<EmployerJobsResponse> {
    return this.http
      .secureGet<
        ApiResponse<EmployerJobsResponse>
      >(URLS.jobs.postedJobs, TOKEN_KEY)
      .pipe(map((res) => res.data));
  }

  createJob(payload: JobRequest): Observable<ApiResponse<Job>> {
    return this.http.securePost<ApiResponse<Job>>(
      URLS.jobs.create,
      payload,
      TOKEN_KEY,
    );
  }

  updateJob(id: string, payload: JobRequest): Observable<ApiResponse<Job>> {
    return this.http.securePut<ApiResponse<Job>>(
      URLS.jobs.update(id),
      payload,
      TOKEN_KEY,
    );
  }

  deleteJob(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      URLS.jobs.delete(id),
      TOKEN_KEY,
    );
  }

  getCandidateProfile(jobId: string, candidateId: string) {
    return this.http.secureGet<{ data: CandidateProfile }>(
      URLS.jobs.candidateProfile(jobId, candidateId),
      TOKEN_KEY,
    );
  }
}
