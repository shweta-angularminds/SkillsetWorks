import {
  FormFieldValue,
  EducationPayload,
} from '../constants/education.interface';

export function mapModalToEducation(
  data: FormFieldValue[],
  educationField: string,
): EducationPayload {
  const educationData: Record<string, string> = {};

  data.forEach((item) => {
    educationData[item.name] = item.value;
  });

  return {
    educationField,
    educationData,
  };
}
