import { Injectable } from "@angular/core";
import { HttpService } from "../../../../../services/http.service";
import { Preference } from "../constants/preference.interface";
import { ApiResponse } from "../../../../../../constants/interfaces/user.interface";
import { URLS } from "../../../../../../constants/url/urls";

const TOKEN_KEY = "userToken"
@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  constructor(private http: HttpService) {}

  updatePreference(id: string, body: Preference) {
    return this.http.patch<ApiResponse<Preference>>(
      URLS.jobseekerDetails.preference,
      body,
      TOKEN_KEY
    );
  }
}
