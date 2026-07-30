export interface JobDescription {
  keyResponsibilities?: string[];
  descriptionInfo?: string[];
  benefits?: string[];
  selectionProcess?: string[];
}
export interface Job {
  _id: string;
  designation: string;
  location: string;
  experience: string;
  positions: number;
  workType: string;
  salary: string;
  qualifications: string[];
  skills: string[];
  employementType: string;
  industry: string;
  department: string;
  desc?: JobDescription;
  employer_id: string;
  updatedAt: Date;

  applicantsCount: number;
  shortlistedCount: number;
}
export interface JobSummary {
  totalJobs: number;
  totalApplicants: number;
  totalShortlisted: number;
}

export interface EmployerJobsResponse {
  jobs: Job[];

  summary: JobSummary;
}

export interface JobStatistics {
  jobId: string;
  applicantsCount: number;
  shortlistedCount: number;
}

export interface JobStatisticsResponse {
  data: {
    jobStatistics: JobStatistics[];
    totalApplicants: number;
    totalShortlisted: number;
  };
}

export interface JobRequest {
  designation: string;
  location: string;
  experience: string;
  positions: number;
  workType: string;
  salary: string;
  qualifications: string[];
  skills: string[];
  employementType: string;
  industry: string;
  department: string;
  desc?: JobDescription;
  employer_id: string;
}