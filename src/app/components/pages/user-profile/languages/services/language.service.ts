import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../services/http.service';
import { LanguagePayload } from '../constants/language.interface';
import { URLS } from '../../../../../../constants/url/urls';

const TOKEN_KEY = 'userToken';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private http: HttpService) {}

  addLanguage(body: LanguagePayload) {
    return this.http.securePost(
      URLS.jobseekerDetails.language,
      body,
      TOKEN_KEY,
    );
  }

  deleteLanguage(body: LanguagePayload) {
    return this.http.delete(URLS.jobseekerDetails.language, TOKEN_KEY, body);
  }
}
