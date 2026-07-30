export interface Employer {
  _id: string;
  employer_name: string;
  email: string;
  companyName: string;
  companyLogo: string;
  contactNumber: string;
  address: string;
  website: string;
}
export interface EmployerListResponse {
  data: Employer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}
