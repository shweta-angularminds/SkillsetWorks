import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService,
  ) {}

  private getHeaders(key: string): HttpHeaders {
    const token = this.localStorageService.getItem(key);

    if (!token) {
      throw new Error('User is not logged in.');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  get<T>(url: string, options?: { params?: HttpParams }): Observable<T> {
    return this.http.get<T>(url, options);
  }

  post<T>(url: string, data: unknown): Observable<T> {
    return this.http.post<T>(url, data);
  }

  securePut<T>(url: string, data: unknown, key: string): Observable<T> {
    return this.http.put<T>(url, data, { headers: this.getHeaders(key) });
  }

  patch<T>(url: string, data: unknown, key: string): Observable<T> {
    return this.http.patch<T>(url, data, { headers: this.getHeaders(key) });
  }

  delete<T>(url: string, key: string, body?: unknown): Observable<T> {
    return this.http.delete<T>(url, { headers: this.getHeaders(key), body });
  }

  secureGet<T>(url: string, key: string, params?: any): Observable<T> {
    return this.http.get<T>(url, { headers: this.getHeaders(key), params });
  }

  securePost<T>(url: string, data: unknown, key: string): Observable<T> {
    return this.http.post<T>(url, data, { headers: this.getHeaders(key) });
  }
}
