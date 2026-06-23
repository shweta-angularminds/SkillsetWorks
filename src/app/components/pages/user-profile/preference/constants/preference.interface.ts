export interface Preference {
  job_type: string[];
  join_time: string;
  locations: string[];
}

export interface PreferenceFormData {
  job_type: string[];
  join_time: string;
  locations: string[];
}
export interface FormFieldValue {
  name: keyof Preference;
  value: string | string[];
}