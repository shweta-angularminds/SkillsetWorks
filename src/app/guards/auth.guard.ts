import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalstorageService);
  const router = inject(Router);

  if (localStorage.isLoggedIn('authToken')) {
    return true;
  } else {
    router.navigate(['/auth/login/employer']);
    return false;
  }
};
