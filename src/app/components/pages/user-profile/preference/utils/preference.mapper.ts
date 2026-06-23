import { Preference } from "../constants/preference.interface";

export function mapModalToPreference(data: any[]): Preference {
  const body: any = {};

  data.forEach((field) => {
    body[field.name] = field.value;
  });

  return {
    job_type: body.job_type ?? [],
    join_time: body.join_time ?? '',
    locations: body.locations ?? [],
  };
}
