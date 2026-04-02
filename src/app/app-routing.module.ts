import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { authGuard, jobSeekerAuthGuard } from './guards/auth.guard';


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
      import('./components/pages/companies/companies.component').then(
        (c) => c.CompaniesComponent,
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'employer',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/pages/employer/employer.module').then(
        (m) => m.EmployerModule,
      ),
  },
  {
    path: 'view-company/:id',
    loadComponent: () =>
      import('./components/pages/view-company/view-company.component').then(
        (c) => c.ViewCompanyComponent,
      ),
  },
  {
    path: 'view-job/:id',
    loadComponent: () =>
      import('./components/pages/view-job/view-job.component').then(
        (c) => c.ViewJobComponent,
      ),
  },
  {
    path: 'jobseeker/profile',
   
    loadComponent: () =>
      import('./components/pages/user-profile/user-profile.component').then(
        (c) => c.UserProfileComponent,
      ),
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
