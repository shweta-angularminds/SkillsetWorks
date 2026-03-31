export interface User{
    username:string;
    contactName:string;
    email:string;
    fresher:boolean;
    location:string;
    gender:string;
    bdate:Date;
    profilePic:string;
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