import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { JobComponent } from './job/job.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path:'jobs',
    component:JobComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'applicants/:id',
    component:ApplicantsComponent
  },
  {
    path:'candidate/:jobId/:id',
    component:CandidateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {
  constructor() {
    
  }
}
