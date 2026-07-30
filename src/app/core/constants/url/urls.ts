import { environment } from "../../../../environments/environment";

const BASE_URL = environment.apiUrl;

export const URLS = {
  auth: {
    jobseekerLogin: `${BASE_URL}/skillset/auth/jobseeker/login`,
    jobseekerRegister: `${BASE_URL}/skillset/auth/jobseeker/register`,
    employerLogin: `${BASE_URL}/skillset/auth/employer/login`,
    employerRegister: `${BASE_URL}/skillset/auth/employer/register`,
  },

  jobseeker: {
    profile: `${BASE_URL}/skillset/jobseeker/profile`,
    image: `${BASE_URL}/skillset/jobseeker/profile/image`,
    resume: `${BASE_URL}/skillset/jobseeker/profile/resume`,
  },

  jobseekerDetails: {
    base: `${BASE_URL}/skillset/jobseeker`,

    details: `${BASE_URL}/skillset/jobseeker/details`,

    education: `${BASE_URL}/skillset/jobseeker/education`,

    experience: `${BASE_URL}/skillset/jobseeker/experience`,
    experienceById: (id: string) =>
      `${BASE_URL}/skillset/jobseeker/experience/${id}`,

    preference: `${BASE_URL}/skillset/jobseeker/preference`,
    summary: `${BASE_URL}/skillset/jobseeker/summary`,
    skills: `${BASE_URL}/skillset/jobseeker/skills`,
    language: `${BASE_URL}/skillset/jobseeker/language`,
  },

  employer: {
    profile: `${BASE_URL}/skillset/employers/profile`,
    changePassword: `${BASE_URL}/skillset/employers/change-password`,
  },
  companies: {
    all: `${BASE_URL}/skillset/employers`,
    profile: (id: string) => `${BASE_URL}/skillset/employers/${id}`,
    view: (id: string) => `${BASE_URL}/skillset/jobs/employer/${id}`,
  },

  jobs: {
    all: `${BASE_URL}/skillset/jobs`,
    getById: (id: string) => `${BASE_URL}/skillset/jobs/${id}`,

    // Employer
    postedJobs: `${BASE_URL}/skillset/employers/jobs`,
    create: `${BASE_URL}/skillset/jobs`,
    update: (id: string) => `${BASE_URL}/skillset/jobs/${id}`,
    delete: (id: string) => `${BASE_URL}/skillset/jobs/${id}`,

    companyJobs: (id: string) =>
      `${BASE_URL}/skillset/employers/jobs/company/${id}`,

    candidateProfile: (jobId: string, candidateId: string) =>
      `${BASE_URL}/skillset/jobs/${jobId}/candidates/${candidateId}`,
  },

  applications: {
    // jobseeker
    apply: `${BASE_URL}/skillset/application`,

    check: (jobId: string) =>
      `${BASE_URL}/skillset/application/job/${jobId}/check`,

    all: `${BASE_URL}/skillset/application/my`,

    view: (id: string) => `${BASE_URL}/skillset/application/view/${id}`,

    // Employer
    applicants: (jobId: string) =>
      `${BASE_URL}/skillset/application/see-applications/${jobId}`,

    updateStatus: (applicationId: string) => `${BASE_URL}/skillset/application/${applicationId}/status`,
  },
};
