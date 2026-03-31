import { ObjectId } from "mongoose";

export interface employer {
  _id: ObjectId;
  employer_name: string;
  email: string;
  companyName: string;
  companyLogo: string;
  contactNumber: string;
  address: string;
  website: string;
}
