import { EducationFormField } from './education.interface';

export function validateEducation(
  educationLevel: string,
  educationData: Record<string, string>,
  fields: EducationFormField[],
): string | null {
  if (!educationLevel) {
    return 'Please select an education level.';
  }

  for (const field of fields) {
    const value = educationData[field.name];

    if (!value?.trim()) {
      return `${field.label} is required.`;
    }
  }

  return null;
}
