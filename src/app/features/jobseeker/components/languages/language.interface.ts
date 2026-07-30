export const LANGUAGE_FIELDS = [
  {
    label: 'Language',
    inputType: 'text',
    placeholder: 'Enter language name',
    name: 'language',
  },
];

export interface LanguagePayload {
  language: string;
}

export interface FormFieldValue {
  name: string;
  value: string;
}
