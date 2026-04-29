
export interface Applicant {
  applicationId: string;
  createdAt: Date;
  email: string;
  resume: string;
  status: string;
  username: string;
  _id: string;
}

export interface JobDetail {
  designation: string;
  _id: string;
}
export interface TotalApplicants {
  statusCounts: StatusCount[];
  totalCount: TotalCount[];
}

 export interface StatusCount {
  _id: string; // approved / rejected / pending
  count: number;
}

export  interface TotalCount {
  totalApplications: number;
}

export interface JobApplicantsResponse {
  Job: JobDetail;
  applicants:Applicant[];
  limit:number;
  page:number;
  totalApplicants:TotalApplicants[]
    
  
}

