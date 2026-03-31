import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { authGuard } from './guards/auth.guard';
import { ViewCompanyComponent } from './components/pages/view-company/view-company.component';
import { ViewJobComponent } from './components/pages/view-job/view-job.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';

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
    component: CompaniesComponent,
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
        (m) => m.EmployerModule
      ),
  },
  {
    path:'view-company/:id',
    component:ViewCompanyComponent
  },
  {
    path:'view-job/:id',
    component:ViewJobComponent
  },
  {
    path:'jobseeker/profile',
    component:UserProfileComponent
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
