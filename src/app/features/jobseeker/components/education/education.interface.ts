
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
export interface EducationFormField {
  name: string;
  label: string;
  type: string;
  value?: string;
}

export interface EducationPayload {
  educationField: string;
  educationData: Record<string, string>;
}

export interface FormFieldValue {
  name: string;
  value: string;
}
export interface SaveEducationData {
  educationField: keyof Education;
  education: Record<string, string>;
}