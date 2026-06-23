import { Injectable } from '@angular/core';
import { add_details, URLS, user_delete_profile_pic_url, user_profile_update_url, user_profile_url, user_update_profile_pic_url, user_url } from '../../constants/url/urls';
import { HttpService } from './http.service';
import { ProfileResponse, User, UserDetails, UserDetailsResponse } from '../../constants/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpService) {}

  getProfile() {
    return this.http.secureGet<ProfileResponse>(URLS.jobseeker.profile, 'userToken');
  }

  getUserDetails() {
    return this.http.secureGet<UserDetailsResponse>(URLS.jobseekerDetails.details,'userToken');
  }

  updateProfile(data: Partial<User>) {
    return this.http.patch<ProfileResponse>(
      URLS.jobseeker.updateProfile,
      data,
      'userToken',
    );
  }

  updateProfilePic(file: File) {
    const formData = new FormData();

    formData.append('profilePic', file, file.name);

    return this.http.patch(user_update_profile_pic_url, formData, 'userToken');
  }

  deleteProfilePic() {
    return this.http.delete(user_delete_profile_pic_url, 'userToken');
  }

  updateResume(userId: string, file: File) {
    const formData = new FormData();

    formData.append('resume', file, file.name);

    return this.http.Patch(`${user_url}/${userId}/update-resume`, formData);
  }
}
