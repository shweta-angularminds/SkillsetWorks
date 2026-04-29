export interface User {
  username: string;
  phone: string;
  email: string;
  fresher: boolean;
  location: string;
  gender: string;
  bdate: Date;
  profilePic: string;
}

export interface Education {
  X: {
    board_name: string;
    passing_year: string;
    medium: string;
    percentage: string;
  };
  XII: {
    board_name: string;
    passing_year: string;
    medium: string;
    percentage: string;
  };
  graduation: {
    course_name: string;
    college_name: string;
    university: string;
    percentage: string;
    cgpa?: string;
    start_year: string;
    end_year: string;
  };
  postgraduation: {
    course_name: string;
    college_name: string;
    university: string;
    cgpa?: string;
    percentage?: string;
    start_year: string;
    end_year: string;
  };
  [key: string]: {
    board_name?: string;
    passing_year?: string;
    medium?: string;
    percentage?: string;
    course_name?: string;
    college_name?: string;
    university?: string;
    cgpa?: string;
    start_year?: string;
    end_year?: string;
  };
}

export interface Preference {
  job_type: string[];
  join_time: string;
  locations: string[];
}

export interface Experience {
  _id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string | null;
  isCurrentJob: boolean;
  description: string;
  technologiesUsed: string[];
  achievements: string[];
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
