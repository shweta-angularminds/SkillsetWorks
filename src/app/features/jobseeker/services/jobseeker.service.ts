import { Injectable } from '@angular/core';
import {
  ApiResponse,
  User,
  UserDetails,
  MessageResponse,
} from '../../../core/constants/interfaces/user.interface';
import { URLS } from '../../../core/constants/url/urls';
import { HttpService } from '../../../core/services/http.service';
import {
  EducationPayload,
  SaveEducationData,
} from '../components/education/education.interface';
import { Experience } from '../components/experience/experience.interface';
import { LanguagePayload } from '../components/languages/language.interface';
import { Preference } from '../components/preference/preference.interface';
import { SkillPayload } from '../components/skills/skill.interface';

const TOKEN_KEY = 'jobseekerToken';

@Injectable({
  providedIn: 'root',
})
export class JobseekerService {
  constructor(private http: HttpService) {}

  getProfile() {
    return this.http.secureGet<ApiResponse<User>>(
      URLS.jobseeker.profile,
      TOKEN_KEY,
    );
  }

  getUserDetails() {
    return this.http.secureGet<ApiResponse<UserDetails>>(
      URLS.jobseekerDetails.details,
      TOKEN_KEY,
    );
  }

  updateProfile(data: Partial<User>) {
    return this.http.patch<ApiResponse<User>>(
      URLS.jobseeker.profile,
      data,
      TOKEN_KEY,
    );
  }

  updateProfilePic(file: File) {
    const formData = new FormData();

    formData.append('profilePic', file, file.name);

    return this.http.patch<ApiResponse<User>>(
      URLS.jobseeker.image,
      formData,
      TOKEN_KEY,
    );
  }

  deleteProfilePic() {
    return this.http.delete<MessageResponse>(URLS.jobseeker.image, TOKEN_KEY);
  }

  updateResume(file: File) {
    const formData = new FormData();

    formData.append('resume', file, file.name);

    return this.http.patch<ApiResponse<User>>(
      URLS.jobseeker.resume,
      formData,
      TOKEN_KEY,
    );
  }

  saveEducation(body: EducationPayload) {
    return this.http.securePost<ApiResponse<SaveEducationData>>(
      URLS.jobseekerDetails.education,
      body,
      TOKEN_KEY,
    );
  }

  addExperience(body: Experience) {
    return this.http.securePost<ApiResponse<Experience[]>>(
      URLS.jobseekerDetails.experience,
      body,
      TOKEN_KEY,
    );
  }

  updateExperience(id: string, body: Experience) {
    return this.http.securePut<ApiResponse<Experience>>(
      URLS.jobseekerDetails.experienceById(id),
      body,
      TOKEN_KEY,
    );
  }

  deleteExperience(id: string) {
    return this.http.delete<MessageResponse>(
      URLS.jobseekerDetails.experienceById(id),
      TOKEN_KEY,
    );
  }

  updateSummary(summary: string) {
    return this.http.patch(
      URLS.jobseekerDetails.summary,
      { summary },
      TOKEN_KEY,
    );
  }

  addLanguage(body: LanguagePayload) {
    return this.http.securePost(
      URLS.jobseekerDetails.language,
      body,
      TOKEN_KEY,
    );
  }

  deleteLanguage(body: LanguagePayload) {
    return this.http.delete(URLS.jobseekerDetails.language, TOKEN_KEY, body);
  }

  updatePreference(body: Preference) {
    return this.http.patch<ApiResponse<Preference>>(
      URLS.jobseekerDetails.preference,
      body,
      TOKEN_KEY,
    );
  }

  addSkill(body: SkillPayload) {
    return this.http.securePost(URLS.jobseekerDetails.skills, body, TOKEN_KEY);
  }

  deleteSkill(body: SkillPayload) {
    return this.http.delete(URLS.jobseekerDetails.skills, TOKEN_KEY, body);
  }
}
