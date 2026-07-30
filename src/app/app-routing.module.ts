import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/public/home/home.component';
import {
  employerAuthGuard,
  jobSeekerAuthGuard,
} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'companies',
    loadComponent: () =>
      import('./features/public/companies/pages/companies-list/companies-list.component').then(
        (c) => c.CompaniesListComponent,
      ),
  },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./features/public/jobs/pages/jobs-list/jobs-list.component').then(
        (c) => c.JobsListComponent,
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'employer',
    canActivate: [employerAuthGuard],
    loadChildren: () =>
      import('./features/employer/employer.module').then(
        (m) => m.EmployerModule,
      ),
  },
  {
    path: 'view-company/:id',
    loadComponent: () =>
      import('./features/public/companies/pages/view-company/view-company.component').then(
        (c) => c.ViewCompanyComponent,
      ),
  },
  {
    path: 'view-job/:id',
    loadComponent: () =>
      import('./features/public/jobs/pages/view-job/view-job.component').then(
        (c) => c.ViewJobComponent,
      ),
  },
  {
    path: 'jobseeker/profile',
    canActivate: [jobSeekerAuthGuard],
    loadComponent: () =>
      import('./features/jobseeker/pages/profile/profile.component').then(
        (c) => c.ProfileComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
