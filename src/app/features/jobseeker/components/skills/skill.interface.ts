export const SKILL_FIELDS = [
  {
    label: 'Skill',
    inputType: 'text',
    placeholder: 'Enter skill here...',
    name: 'skill',
  },
];

export interface SkillPayload {
  skill: string;
}

export interface FormFieldValue {
  name: string;
  value: string;
}
