import { Pagination } from "./shared.inerface";

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