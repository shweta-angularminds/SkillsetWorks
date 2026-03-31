import { ObjectId } from 'mongoose';

export interface Application {
  application_id: ObjectId;
  designation: string;
  job_id: ObjectId;
  company_name: string;
  status:string;
  createdAt: Date;
  updatedAt: Date;

}
