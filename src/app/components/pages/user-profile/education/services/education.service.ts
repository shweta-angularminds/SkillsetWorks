import { Injectable } from "@angular/core";
import { HttpService } from "../../../../../services/http.service";
import { EducationPayload, SaveEducationData } from "../constants/education.interface";
import { URLS} from "../../../../../../constants/url/urls";
import { ApiResponse } from "../../../../../../constants/interfaces/user.interface";

const TOKEN_KEY = "userToken"
@Injectable({
  providedIn: 'root',
})
export class EducationService {
  constructor(private http: HttpService) {}

  saveEducation(body: EducationPayload) {
    return this.http.securePost<ApiResponse<SaveEducationData>>(URLS.jobseekerDetails.education, body,TOKEN_KEY);
  }
}
