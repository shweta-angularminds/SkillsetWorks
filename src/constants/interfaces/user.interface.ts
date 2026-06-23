import { Education } from '../../app/components/pages/user-profile/education/constants/education.interface';
import { Experience } from '../../app/components/pages/user-profile/experience/constants/experience.interface';
import { Preference } from '../../app/components/pages/user-profile/preference/constants/preference.interface';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface UserDetailsResponse {
  success: boolean;
  data: UserDetails;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  gender?: string;
  location?: string;
  bdate?: Date;
  profilePic?: string;
  resume?: string;
  fresher: boolean;
}
export interface UserDetails {
  summary: string;
  skills: string[];
  languages: string[];
  preference: Preference | null;
  education: Education | null;
  experience: Experience[];
}




export interface CandidateProfile {
  user_info: User;
  education: Education;
  summary: string;
  skills: string[];
  preference: Preference;
  experience: Experience[];
  languages: string[];
}
