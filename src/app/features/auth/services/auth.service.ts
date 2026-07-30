import { inject, Injectable } from '@angular/core';
import { URLS } from '../../../core/constants/url/urls';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message?: string;
}
export interface AuthResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpService);

  employerLogin(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(URLS.auth.employerLogin, payload);
  }

  jobSeekerLogin(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(URLS.auth.jobseekerLogin, payload);
  }

  employerRegister(formData: FormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(URLS.auth.employerRegister, formData);
  }

  jobSeekerRegister(formData: FormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(URLS.auth.jobseekerRegister, formData);
  }
}
