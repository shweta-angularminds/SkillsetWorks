import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private localstorage: LocalstorageService
  ) {}

  get(url: string, params?: any): Observable<any> {
    return this.http.get<any>(url, params);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }
  Put(url: string, data: any): Observable<any> {
    return this.http.put<any>(url, data);
  }

  securePut(url: string, data: any): Observable<any> {
    const token = this.localstorage.getItem('authToken');

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(url, data, { headers });
  }

  Patch(url: string, data: any): Observable<any> {
    return this.http.patch<any>(url, data);
  }

  patch(url: string, data: any, key: string): Observable<any> {
    const token = this.localstorage.getItem(key);

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<any>(url, data, { headers });
  }

  delete(url: string, key: string): Observable<any> {
    const token = this.localstorage.getItem(key);

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(url, { headers });
  }

  secureGet(url: string, key: string): Observable<any> {
    const token = this.localstorage.getItem(key);

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(url, { headers });
  }
  securePost(url: string, data: any): Observable<any> {
    const token = this.localstorage.getItem('authToken');

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(url, data, { headers });
  }
}
