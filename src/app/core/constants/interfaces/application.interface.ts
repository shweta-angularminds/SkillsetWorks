import { Pagination } from './shared.inerface';

export interface Application {
  application_id: string;
  designation: string;
  job_id: string;
  company_name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ApplicationListResponse {
  data: Application[];
  pagination: Pagination;
}

export interface StatusCount {
  _id: string;
  count: number;
}

export interface TotalApplicant {
  statusCounts: StatusCount[];
  totalCount: {
    totalApplications: number;
  }[];
}

export interface Applicant {
  _id: string;
  username: string;
  email: string;
  resume: string;
  createdAt: string;
  applicationId: string;
  status: string;
}

export interface JobInfo {
  _id: string;
  designation: string;
}

export interface JobApplicantsResponse {
  job: JobInfo;
  totalApplicants: TotalApplicant[];
  page: number;
  limit: number;
  applicants: Applicant[];
}