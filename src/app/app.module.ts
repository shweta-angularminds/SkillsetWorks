import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { ViewCompanyComponent } from './components/pages/view-company/view-company.component';
import { DateDiffPipe } from './pipes/date-diff.pipe';
import { ViewJobComponent } from './components/pages/view-job/view-job.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationComponent } from './components/pages/user-profile/education/education.component';
import { PreferenceComponent } from './components/pages/user-profile/preference/preference.component';
import { SkillsComponent } from './components/pages/user-profile/skills/skills.component';
import { LanguagesComponent } from './components/pages/user-profile/languages/languages.component';
import { InternshipsComponent } from './components/pages/user-profile/internships/internships.component';
import { ViewApplicationsComponent } from './components/pages/view-applications/view-applications.component';
import { ApplicationsComponent } from './components/pages/user-profile/applications/applications.component';
import { NgChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalComponent } from './components/partials/modal/modal.component';
import { SummaryComponent } from './components/pages/user-profile/summary/summary.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompaniesComponent,
    ViewCompanyComponent,
    DateDiffPipe,
    ViewJobComponent,
    UserProfileComponent,
    EducationComponent,
    PreferenceComponent,
    SkillsComponent,
    LanguagesComponent,
    InternshipsComponent,
    ViewApplicationsComponent,
    ApplicationsComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    HttpClientModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgChartsModule,
    ModalComponent,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
