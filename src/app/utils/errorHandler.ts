import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '../services/notify.service';

export function showError(
  notify: NotifyService,
  err: HttpErrorResponse,
  defaultMessage = 'Something went wrong. Please try again later.',
): void {
    
  notify.notifyMessage('error', err.error?.message || defaultMessage);
}
