import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { inject } from '@angular/core';

export const employerAuthGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalstorageService);
  const router = inject(Router);

  if (localStorage.isLoggedIn('employerToken')) {
    return true;
  } else {
    return router.createUrlTree(['/auth/login/employer']);
  }
};

export const jobSeekerAuthGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalstorageService);
  const router = inject(Router);
  if (localStorage.isLoggedIn('jobseekerToken')) {
    return true;
  } else {
    return router.createUrlTree(['/auth/login/jobseeker']);
  }
};
