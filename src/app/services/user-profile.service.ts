import { Injectable } from '@angular/core';
import { URLS } from '../../constants/url/urls';
import { HttpService } from './http.service';
import {
  ProfileResponse,
  User,
  UserDetailsResponse,
} from '../../constants/interfaces/user.interface';

const TOKEN_KEY = 'userToken';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpService) {}

  getProfile() {
    return this.http.secureGet<ProfileResponse>(
      URLS.jobseeker.profile,
      TOKEN_KEY,
    );
  }

  getUserDetails() {
    return this.http.secureGet<UserDetailsResponse>(
      URLS.jobseekerDetails.details,
      TOKEN_KEY,
    );
  }

  updateProfile(data: Partial<User>) {
    return this.http.patch<ProfileResponse>(
      URLS.jobseeker.updateProfile,
      data,
      TOKEN_KEY,
    );
  }

  updateProfilePic(file: File) {
    const formData = new FormData();

    formData.append('profilePic', file, file.name);

    return this.http.patch<ProfileResponse>(
      URLS.jobseeker.uploadPic,
      formData,
      TOKEN_KEY,
    );
  }

  deleteProfilePic() {
    return this.http.delete(URLS.jobseeker.deletePic, TOKEN_KEY);
  }

  updateResume(file: File) {
    const formData = new FormData();

    formData.append('resume', file, file.name);

    return this.http.patch<ProfileResponse>(URLS.jobseeker.updateResume, formData,TOKEN_KEY);
  }
}
