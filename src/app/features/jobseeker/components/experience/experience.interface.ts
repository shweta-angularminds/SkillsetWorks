export interface Experience {
  _id?: string;
  companyName: string;
  jobTitle: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate?: string | null;
  isCurrentJob: boolean;
  description: string;
  technologiesUsed: string[];
  achievements: string[];
}

export interface ExperienceFormData {
  _id?: string;
  companyName: string;
  jobTitle: string;
  location: string;

  employmentType: string[];

  startDate: string;
  endDate: string;

  isCurrentJob: string[];

  description: string;

  technologiesUsed: string;
  achievements: string;
}
export interface FormFieldValue {
  name: string;
  value: unknown;
}