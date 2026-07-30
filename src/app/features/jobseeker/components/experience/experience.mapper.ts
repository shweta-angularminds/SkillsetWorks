import { Experience, ExperienceFormData } from './experience.interface';

export function mapModalToExperience(data: any[]): Experience {
  const obj: any = {};

  data.forEach((field) => {
    obj[field.name] = field.value;
  });
  const isCurrentJob = obj.isCurrentJob?.length > 0;

  return {
    companyName: obj.companyName,
    jobTitle: obj.jobTitle,
    location: obj.location,
    employmentType: obj.employmentType?.[0] || '',
    startDate: obj.startDate,
    isCurrentJob: obj.isCurrentJob?.length > 0,
    description: obj.description,
    technologiesUsed: obj.technologiesUsed
      ? obj.technologiesUsed.split(',').map((t: string) => t.trim())
      : [],
    achievements: obj.achievements
      ? obj.achievements.split(',').map((a: string) => a.trim())
      : [],
    ...(isCurrentJob ? {} : { endDate: obj.endDate }),
  };
}
export function mapExperienceToModal(exp: Experience): ExperienceFormData {
  return {
    ...exp,
    startDate: exp.startDate?.split('T')[0],

    endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
    technologiesUsed: exp.technologiesUsed.join(', '),
    achievements: exp.achievements.join(', '),
    isCurrentJob: exp.isCurrentJob ? ['current'] : [],
    employmentType: [exp.employmentType],
  };
}
