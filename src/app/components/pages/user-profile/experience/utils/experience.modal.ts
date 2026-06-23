import {
  Experience,
  ExperienceFormData,
} from '../constants/experience.interface';

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
