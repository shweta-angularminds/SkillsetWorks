import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/public/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { DateDiffPipe } from './shared/pipes/date-diff.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalComponent } from './shared/components/modal/modal.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { LoaderComponent } from './shared/components/loader/loader.component';
import { provideLottieOptions } from 'ngx-lottie';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { CompaniesListComponent } from './features/public/companies/pages/companies-list/companies-list.component';
import { errorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent, HomeComponent],
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
    DateDiffPipe,
    CompaniesListComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
