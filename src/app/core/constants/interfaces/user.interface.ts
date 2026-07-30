import { Education } from '../../../features/jobseeker/components/education/education.interface';
import { Experience } from '../../../features/jobseeker/components/experience/experience.interface';
import { Preference } from '../../../features/jobseeker/components/preference/preference.interface';

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
  education: Education;
  languages: string[];
  skills: string[];
  summary: string;
  preference: Preference;
  experience: Experience[];
 

  user_info: {
    username: string;
    phone: string;
    email: string;
    fresher: boolean;
    bdate: string;
    gender: string;
    location: string;
    profilePic: string;
  };
}