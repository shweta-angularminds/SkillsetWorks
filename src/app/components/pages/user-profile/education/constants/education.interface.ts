import { Education } from "../../../../../../constants/interfaces/user.interface";

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