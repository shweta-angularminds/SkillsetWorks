export const PREFERENCE_FIELDS = [
  {
    label: 'Preferred Work Type',
    inputType: 'checkbox',
    name: 'job_type', // Unique name for form handling
    options: [
      { label: 'Internship', value: 'internship' },
      { label: 'Job', value: 'job' },
    ],
    value: [], // Array to store selected values
  },
  {
    label: 'Join Time',
    inputType: 'radio',
    name: 'join_time', // Unique name for form handling
    options: [
      // { label: 'Immediate', value: 'immediate' },
      { label: '15 Days', value: '15 days' },
      { label: '1 Month', value: '1 month' },
      { label: '2 Months', value: '2 months' },
      { label: '3 Months', value: '3 months' },
    ],
    value: [], // Array to store selected values
  },
  {
    label: 'locations',
    inputType: 'select',
    name: 'locations',
    options: [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'delhi', label: 'Delhi' },
      { value: 'pune', label: 'Pune' },
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'hyderabad', label: 'Hyderabad' },
      { value: 'chennai', label: 'Chennai' },
      { value: 'chandigarh', label: 'Chandigarh' },
      { value: 'kolkata', label: 'Kolkata' },
      { value: 'gurgaon', label: 'Gurgaon' },
      { value: 'ahemdabad', label: 'Ahemdabad' },
    ],
    value: [],
  },
  // Other fields
];
