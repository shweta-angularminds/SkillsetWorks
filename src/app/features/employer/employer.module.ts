import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

import { SidenavbarComponent } from '../../shared/components/sidenavbar/sidenavbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxEditorModule } from 'ngx-editor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { PdfViewerComponent } from '../../shared/components/pdf-viewer/pdf-viewer.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../shared/components/bar-chart/bar-chart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApplicantsComponent } from './pages/applicants/applicants.component';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { JobComponent } from './components/job/job.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { JobSummaryComponent } from './components/job-summary/job-summary.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { JobFormModalComponent } from './components/job-form-modal/job-form-modal.component';

@NgModule({
  declarations: [
    ProfileComponent,

    SettingsComponent,
    JobComponent,
    DashboardComponent,
    ApplicantsComponent,
    CandidateProfileComponent,
    JobListComponent,
    JobCardComponent,
    JobFormModalComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    NavbarComponent,
    FormsModule,
    SidenavbarComponent,
    ReactiveFormsModule,
    NgxEditorModule,
    PdfViewerComponent,
    PieChartComponent,
    BarChartComponent,
    NgxPaginationModule,
    JobSummaryComponent,
  ],
})
export class EmployerModule {}
