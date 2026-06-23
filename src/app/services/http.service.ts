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
    private localstorage: LocalstorageService,
  ) {}

  get<T>(url: string, options?: { params?: HttpParams }): Observable<T> {
    return this.http.get<T>(url, options);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }
  Put(url: string, data: any): Observable<any> {
    return this.http.put<any>(url, data);
  }

  securePut<T>(url: string, data: any, key: string): Observable<T> {
    const token = this.localstorage.getItem(key);

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<T>(url, data, { headers });
  }
  Patch<T>(url: string, data: any): Observable<T> {
    return this.http.patch<T>(url, data);
  }

  patch<T>(url: string, data: any, key: string): Observable<T> {
    const token = this.localstorage.getItem(key);

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<T>(url, data, { headers });
  }

  delete<T>(url: string, key: string,body?:any): Observable<T> {
    const token = this.localstorage.getItem(key);

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<T>(url, { headers,body });
  }

  secureGet<T>(url: string, key: string): Observable<T> {
    const token = this.localstorage.getItem(key);

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<T>(url, { headers });
  }

  securePost<T>(url: string, data: any, key: string): Observable<T> {
    const token = this.localstorage.getItem(key);

    if (!token) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<T>(url, data, { headers });
  }
}
