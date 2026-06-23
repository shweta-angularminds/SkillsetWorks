import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../services/http.service';
import {
  ApiResponse,
  MessageResponse,
} from '../../../../../../constants/interfaces/user.interface';
import { URLS } from '../../../../../../constants/url/urls';
import { Experience } from '../constants/experience.interface';

const TOKEN_KEY = 'userToken';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private http: HttpService) {}

  addExperience(body: Experience) {
    return this.http.securePost<ApiResponse<Experience>>(
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
}
