import { Injectable } from '@angular/core';
import { URLS } from '../../constants/url/urls';
import { HttpService } from './http.service';
import {
  ApiResponse,
  MessageResponse,
  User,
  UserDetails,
} from '../../constants/interfaces/user.interface';

const TOKEN_KEY = 'userToken';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
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
      URLS.jobseeker.updateProfile,
      data,
      TOKEN_KEY,
    );
  }

  updateProfilePic(file: File) {
    const formData = new FormData();

    formData.append('profilePic', file, file.name);

    return this.http.patch<ApiResponse<User>>(
      URLS.jobseeker.uploadPic,
      formData,
      TOKEN_KEY,
    );
  }

  deleteProfilePic() {
    return this.http.delete<MessageResponse>(
      URLS.jobseeker.deletePic,
      TOKEN_KEY,
    );
  }

  updateResume(file: File) {
    const formData = new FormData();

    formData.append('resume', file, file.name);

    return this.http.patch<ApiResponse<User>>(
      URLS.jobseeker.updateResume,
      formData,
      TOKEN_KEY,
    );
  }
}
