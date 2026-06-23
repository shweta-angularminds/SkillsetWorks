import { Experience } from '../../app/components/pages/user-profile/experience/constants/experience.interface';

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
export interface Education {
  X?: {
    board_name: string;
    passing_year: string;
    medium: string;
    percentage: string;
  };
  XII?: {
    board_name: string;
    passing_year: string;
    medium: string;
    percentage: string;
  };
  graduation?: {
    course_name: string;
    college_name: string;
    university: string;
    percentage: string;
    cgpa?: string;
    start_year: string;
    end_year: string;
  };
  postgraduation?: {
    course_name: string;
    college_name: string;
    university: string;
    cgpa?: string;
    percentage?: string;
    start_year: string;
    end_year: string;
  };
}

export interface Preference {
  job_type: string[];
  join_time: string;
  locations: string[];
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
