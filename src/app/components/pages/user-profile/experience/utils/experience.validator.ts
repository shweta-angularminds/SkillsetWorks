import { Experience } from '../constants/experience.interface';

export function validateExperience(experience: Experience): string | null {
  if (!experience.companyName.trim()) {
    return 'Company Name is required';
  }

  if (!experience.jobTitle.trim()) {
    return 'Job Title is required';
  }

  if (!experience.employmentType) {
    return 'Employment Type is required';
  }

  if (!experience.startDate) {
    return 'Start Date is required';
  }

  if (!experience.isCurrentJob && !experience.endDate) {
    return 'End Date is required';
  }

  if (
    experience.endDate &&
    new Date(experience.startDate) > new Date(experience.endDate)
  ) {
    return 'Start Date cannot be later than End Date';
  }

  return null;
}
