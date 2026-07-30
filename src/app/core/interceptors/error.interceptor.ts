import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { NotifyService } from '../services/notify.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotifyService)

  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      switch (error.status) {
        case 0:
          notify.notifyMessage('error', 'Unable to connect to the server.');
          break;

        case 400:
          notify.notifyMessage('error', error.error?.message || 'Bad request.');
          break;

        case 401:
          notify.notifyMessage('error', 'Please login again.');
          break;

        case 403:
          notify.notifyMessage('error', 'Access denied.');
          break;

        case 404:
          notify.notifyMessage('error', 'Resource not found.');
          break;

        case 500:
          notify.notifyMessage('error', 'Internal server error.');
          break;

        default:
          notify.notifyMessage('error', 'Something went wrong.');
      }
         return throwError(() => error);
    })
  )
};
