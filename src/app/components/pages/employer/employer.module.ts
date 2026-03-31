import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { EmpNavbarComponent } from './emp-navbar/emp-navbar.component';
import { SidenavbarComponent } from '../../partials/sidenavbar/sidenavbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { JobComponent } from './job/job.component';
import { FormComponent } from '../../partials/form/form.component';
import { NgxEditorModule } from 'ngx-editor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { PdfViewerComponent } from '../../partials/pdf-viewer/pdf-viewer.component';
import { PieChartComponent } from "../../partials/pie-chart/pie-chart.component";
import { BarChartComponent } from "../../partials/bar-chart/bar-chart.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
@NgModule({
  declarations: [
    ProfileComponent,
    EmpNavbarComponent,
    SettingsComponent,
    JobComponent,
    DashboardComponent,
    ApplicantsComponent,
    CandidateProfileComponent,
    
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
    NgxPaginationModule
],
})
export class EmployerModule {}
