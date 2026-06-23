import { Injectable } from "@angular/core";
import { HttpService } from "../../../../../services/http.service";
import { URLS } from "../../../../../../constants/url/urls";

const TOKEN_KEY = "userToken"
@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  constructor(private http: HttpService) {}

  updateSummary(id: string, summary: string) {
    return this.http.patch(URLS.jobseekerDetails.summary, { summary },TOKEN_KEY);
  }
}
