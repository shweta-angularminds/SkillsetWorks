import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { HttpService } from '../../../../services/http.service';
import {
  Application,
  ApplicationListResponse,
} from '../../../../../constants/interfaces/application.interface';
import { URLS } from '../../../../../constants/url/urls';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
})
export class ApplicationsComponent implements OnInit {
  @Input() UserId!: string;

  applications: Application[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  searchTerm = '';
  selectedStatus = '';

  private searchSubject = new Subject<string>();
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
        this.getAllApplications();
      });

    this.getAllApplications();
  }

  get isFiltering(): boolean {
    return !!this.searchTerm || !!this.selectedStatus;
  }
  onSearch(): void {
    this.currentPage = 1;

    this.searchSubject.next(this.searchTerm);
  }

  onStatusChange(): void {
    this.currentPage = 1;

    this.getAllApplications();
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAllApplications();
  }

  getAllApplications(): void {
    const params = {
      page: this.currentPage,
      limit: this.itemsPerPage,
      search: this.searchTerm.trim(),
      status: this.selectedStatus,
    };

    this.http
      .secureGet<ApplicationListResponse>(
        URLS.jobseekerDetails.application,
        'userToken',
        params,
      )
      .subscribe({
        next: (response) => {
          this.applications = response.data;
          this.totalItems = response.pagination.total;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
