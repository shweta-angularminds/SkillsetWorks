import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { Application } from '../../../../core/constants/interfaces/application.interface';

import { ApplicationService } from '../../services/application.service';

@Component({
  standalone: true,
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrl: './view-applications.component.css',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
})
export class ViewApplicationsComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  userId!: string;

  applications: Application[] = [];

  currentPage = 1;
  readonly itemsPerPage = 10;

  totalItems = 0;

  searchTerm = '';
  selectedStatus = '';

  private readonly applicationService = inject(ApplicationService);

  private readonly searchSubject = new Subject<string>();

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.setupSearch();

    this.loadApplications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isFiltering(): boolean {
    return !!this.searchTerm || !!this.selectedStatus;
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onStatusChange(): void {
    this.currentPage = 1;
    this.loadApplications();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadApplications();
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentPage = 1;
        this.loadApplications();
      });
  }

  private loadApplications(): void {
    this.applicationService
      .getApplications({
        page: this.currentPage,
        limit: this.itemsPerPage,
        search: this.searchTerm.trim(),
        ...(this.selectedStatus && { status: this.selectedStatus }),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.applications = response.data;
          this.totalItems = response.pagination.total;
        },
      });
  }
}
