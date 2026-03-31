export const base_url = 'https://jobportal-backend-zmjx.onrender.com/';
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

export const application = base_url + 'skillset/application';
export const view_application_url = application + '/view/';
export const view_all_applications_url = application + '/viewAll/';
export const apply_job_url = application + '/apply';

export const get_applicants_count_url = application + '/getApplicationsCount';
export const get_all_applications_url = application + '/see-applications/';
export const update_application_status_url = application + '/update-status';
