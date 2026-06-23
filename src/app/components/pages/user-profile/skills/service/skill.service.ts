import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../services/http.service';
import { SkillPayload } from '../constants/skill.interface';
import { URLS } from '../../../../../../constants/url/urls';

const TOKEN_KEY = 'userToken';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private http: HttpService) {}

  addSkill(id: string, body: SkillPayload) {
    return this.http.securePost(URLS.jobseekerDetails.skills, body, TOKEN_KEY);
  }

  deleteSkill(id: string, body: SkillPayload) {
    return this.http.delete(URLS.jobseekerDetails.skills, TOKEN_KEY, body);
  }
}
