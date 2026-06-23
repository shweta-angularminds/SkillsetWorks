// export const base_url = 'https://jobportal-backend-zmjx.onrender.com/';
export const base_url = 'http://localhost:5000/';
export const download_resume_url = base_url + 'download/download-resume/';

const base_auth_url = base_url + 'skillset/auth/';

//auth urls for employer

export const employer_login_url = base_auth_url + 'employer/login';
export const employer_register_url = base_auth_url + 'employer/register';

//auth urls for jobseeker

export const user_register_url = base_auth_url + 'jobseeker/register';
export const user_login_url = base_auth_url + 'jobseeker/login';

export const employer_url = base_url + 'skillset/employers';
export const profile_url = employer_url + '/profile';
export const profile_update_url = profile_url + '/update';
export const password_change_url = employer_url + '/change-password';

export const employer_job_base_url = employer_url + '/jobs';
export const get_all_active_jobs_url = employer_job_base_url + '/view/all';
export const add_new_job_url = employer_job_base_url + '/add';
export const update_job_url = employer_job_base_url + '/update/';
export const delete_job_url = employer_job_base_url + '/delete/';

export const get_all_jobs = employer_job_base_url + '/find';
//user

export const get_job_by_company = employer_job_base_url + '/company/';

export const user_url = base_url + 'skillset/user';

export const user_profile_url = user_url + '/profile';
export const user_profile_update_url = user_url + '/update-profile';
export const user_update_profile_pic_url = user_url + '/upload-pic';
export const user_delete_profile_pic_url = user_url + '/delete-profile-pic';

export const add_details = base_url + 'skillset/jobseeker';
export const user_add_education_url = add_details + '/';
export const get_education_details_url = add_details + '/fetch/';

//language
export const add_language_url = add_details + '/';

export const add_experience_url = add_details + '/experience';

export const application = base_url + 'skillset/application';
export const view_application_url = application + '/view/';
export const view_all_applications_url = application + '/viewAll/';
export const apply_job_url = application + '/apply';

export const get_applicants_count_url = application + '/getApplicationsCount';
export const get_all_applications_url = application + '/see-applications/';
export const update_application_status_url = application + '/update-status';

// urls.ts

const BASE_URL = 'http://localhost:5000';

export const URLS = {
  auth: {
    jobseekerLogin: `${BASE_URL}/skillset/auth/jobseeker/login`,
    jobseekerRegister: `${BASE_URL}/skillset/auth/jobseeker/register`,
    employerLogin: `${BASE_URL}/skillset/auth/employer/login`,
    employerRegister: `${BASE_URL}/skillset/auth/employer/register`,
  },

  jobseeker: {
    profile: `${BASE_URL}/skillset/user/profile`,
    updateProfile: `${BASE_URL}/skillset/user/update-profile`,
    uploadPic: `${BASE_URL}/skillset/user/upload-pic`,
    deletePic: `${BASE_URL}/skillset/user/delete-profile-pic`,

    updateResume: `${BASE_URL}/skillset/user/update-resume`,
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
  },

  employer: {
    profile: `${BASE_URL}/skillset/employers/profile`,
    changePassword: `${BASE_URL}/skillset/employers/change-password`,
  },

  jobs: {
    add: `${BASE_URL}/skillset/employers/jobs/add`,
    update: `${BASE_URL}/skillset/employers/jobs/update`,
    delete: `${BASE_URL}/skillset/employers/jobs/delete`,

    companyJobs: (id: string) =>
      `${BASE_URL}/skillset/employers/jobs/company/${id}`,
  },

  applications: {
    apply: `${BASE_URL}/skillset/application/apply`,

    view: (id: string) => `${BASE_URL}/skillset/application/view/${id}`,

    updateStatus: `${BASE_URL}/skillset/application/update-status`,
  },
};
