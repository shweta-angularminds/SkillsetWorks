export interface SummaryFormData {
  summary: string;
}

export interface FormFieldValue {
  name: string;
  value: string;
}
export const SUMMARY_FIELDS = [
  {
    label: 'Profile Summary',
    inputType: 'textarea',
    placeholder: 'Write profile summary...',
    name: 'summary',
  },
];