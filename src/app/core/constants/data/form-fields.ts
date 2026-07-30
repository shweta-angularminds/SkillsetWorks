import { UserDetails } from "../interfaces/user.interface";

export const INITIAL_USER_DETAILS: UserDetails = {
  languages: [],
  skills: [],
  experience: [],
  summary: '',
  education: null,
  preference: null,
};

export const EducationField = [
  {
    title: 'X',
    fields: [
      {
        label: 'Board',
        inputType: 'text',
        placeholder: 'Enter your board name',
        value: '',
        name: 'board_name',
      },
      {
        label: 'Passing Year',
        inputType: 'text',
        placeholder: 'Enter your passing Year',
        value: '',
        name: 'passing_year',
      },
      {
        label: 'Medium',
        inputType: 'text',
        placeholder: 'Enter your learning medium (e.g., English, Marathi)',
        value: '',
        name: 'medium',
      },
      {
        label: 'Percentage',
        inputType: 'text',
        placeholder: 'Enter your percentage',
        value: '',
        name: 'percentage',
      },
    ],
  },
  {
    title: 'XII',
    fields: [
      {
        label: 'Board',
        inputType: 'text',
        placeholder: 'Enter your board name',
        value: '',
        name: 'board_name',
      },
      {
        label: 'Passing Year',
        inputType: 'text',
        placeholder: 'Enter your passing Year',
        value: '',
        name: 'passing_year',
      },
      {
        label: 'Medium',
        inputType: 'text',
        placeholder: 'Enter your learning medium (e.g., English, Marathi)',
        value: '',
        name: 'medium',
      },
      {
        label: 'Percentage',
        inputType: 'text',
        placeholder: 'Enter your percentage',
        value: '',
        name: 'percentage',
      },
    ],
  },
  {
    title: 'graduation',
    fields: [
      {
        label: 'Course Name',
        inputType: 'text',
        placeholder: 'Enter your course name',
        value: '',
        name: 'course_name',
      },
      {
        label: 'College Name',
        inputType: 'text',
        placeholder: 'Enter your college name',
        value: '',
        name: 'college_name',
      },
      {
        label: 'University',
        inputType: 'text',
        placeholder: 'Enter your university name',
        value: '',
        name: 'university',
      },

      {
        label: 'CGPA',
        inputType: 'text',
        placeholder: 'Enter your CGPA',
        value: '',
        name: 'cgpa',
      },
      {
        label: 'Start Year',
        inputType: 'text',
        placeholder: 'Enter your start year',
        value: '',
        name: 'start_year',
      },
      {
        label: 'End Year',
        inputType: 'text',
        placeholder: 'Enter your end year',
        value: '',
        name: 'end_year',
      },
    ],
  },
  {
    title: 'postgraduation',
    fields: [
      {
        label: 'Course Name',
        inputType: 'text',
        placeholder: 'Enter your course name',
        value: '',
        name: 'course_name',
      },
      {
        label: 'College Name',
        inputType: 'text',
        placeholder: 'Enter your college name',
        value: '',
        name: 'college_name',
      },
      {
        label: 'University',
        inputType: 'text',
        placeholder: 'Enter your university name',
        value: '',
        name: 'university',
      },

      {
        label: 'CGPA',
        inputType: 'text',
        placeholder: 'Enter your CGPA',
        value: '',
        name: 'cgpa',
      },
      {
        label: 'Start Year',
        inputType: 'text',
        placeholder: 'Enter your start year',
        value: '',
        name: 'start_year',
      },
      {
        label: 'End Year',
        inputType: 'text',
        placeholder: 'Enter your end year',
        value: '',
        name: 'end_year',
      },
    ],
  },
];

export const ExperienceD = [
  {
    fields: [
      {
        label: 'Company Name',
        placeholder: 'Enter company name',
        inputType: 'text',
        name: 'companyName',
        value: '',
      },
      {
        label: 'Job Title',
        placeholder: 'Enter job title',
        inputType: 'text',
        name: 'jobTitle',
        value: '',
      },
      {
        label: 'Location',
        placeholder: 'Enter company location',
        inputType: 'text',
        name: 'location',
        value: '',
      },
      {
        label: 'Employment Type',
        placeholder: 'Select employment type',
        inputType: 'select',
        name: 'employmentType',
        options: [
          { label: 'Full-time', value: 'Full-time' },
          { label: 'Part-time', value: 'Part-time' },
          { label: 'Internship', value: 'Internship' },
          { label: 'Contract', value: 'Contract' },
        ],
        value: '',
      },
      {
        label: 'Start Date',
        placeholder: 'Select Start Date',
        inputType: 'date',
        name: 'startDate',
        value: '',
      },
      {
        label: 'End Date',
        placeholder: 'Select End Date',
        inputType: 'date',
        name: 'endDate',
        value: '',
      },

      {
        label: 'Current Job',
        inputType: 'checkbox',
        name: 'isCurrentJob',
        options: [{ label: 'I currently work here', value: 'current' }],
        value: [],
      },

      {
        label: 'Description',
        inputType: 'textarea',
        placeholder: 'Write description about work',
        name: 'description',
        value: '',
      },

      {
        label: 'Technologies',
        inputType: 'text',
        placeholder: 'Enter technologies (Angular, Node, React..)',
        name: 'technologiesUsed',
        value: '',
      },

      {
        label: 'Achievements',
        inputType: 'text',
        placeholder: 'Tell your achievements',
        name: 'achievements',
        value: '',
      },
    ],
  },
];
