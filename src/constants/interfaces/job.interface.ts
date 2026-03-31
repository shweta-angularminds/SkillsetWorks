
export interface JobDescription {
  keyResponsibilities?: string[];
  descriptionInfo?: string[];
  benefits?: string[];
  selectionProcess?: string[];
}
export interface Job {
    _id:string;
  designation: string;
  location: string;
  experience: string;
  positions: number;
  workType: string;
  salary: string;
  qualifications: string[];
  skills: string[];
  employementType: string;
  industry: string;
  department: string;
  desc?: JobDescription;
  employer_id: string;
  updatedAt:Date;
}
