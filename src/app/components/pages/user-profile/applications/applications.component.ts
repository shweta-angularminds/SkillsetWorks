import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { view_all_applications_url } from '../../../../../constants/url/urls';
import { Application } from '../../../../../constants/interfaces/application.interface';
import { CommonModule } from '@angular/common';
import { PaginatePipe, NgxPaginationModule } from 'ngx-pagination';
import { ViewApplicationsComponent } from '../../view-applications/view-applications.component';

@Component({
  standalone:true,
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
  imports: [CommonModule, NgxPaginationModule,ViewApplicationsComponent]
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  SelectedApplication!: Application;
  @Input()
  UserId!: string;
  p: number = 1;
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getAllApplications();
  }
  getAllApplications() {
    this.http.get(view_all_applications_url + this.UserId).subscribe({
      next: (res: Application[]) => {
        this.applications = res;

        if (this.applications.length !== 0) {
          this.SelectedApplication = this.applications[0];
        }
      },
    });
  }
}
