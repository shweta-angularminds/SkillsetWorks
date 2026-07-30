import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { ApplicantsComponent } from './pages/applicants/applicants.component';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { JobComponent } from './components/job/job.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';

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
    path: 'jobs',
    component: JobComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'applicants/:id',
    component: ApplicantsComponent,
  },
  {
    path: 'candidate/:jobId/:id',
    component: CandidateProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {
  constructor() {}
}
