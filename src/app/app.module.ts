import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { ViewCompanyComponent } from './components/pages/view-company/view-company.component';
import { DateDiffPipe } from './pipes/date-diff.pipe';
import { ViewJobComponent } from './components/pages/view-job/view-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalComponent } from './components/partials/modal/modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderComponent } from './components/partials/loader/loader.component';
import { provideLottieOptions } from 'ngx-lottie';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   

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
    NgxPaginationModule,
    LoaderComponent,
    DateDiffPipe
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
