import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Employer } from '../../../../../core/constants/interfaces/employer.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { CompaniesService } from '../../services/companies.service';

@Component({
  standalone: true,
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.css',
  imports: [CommonModule, RouterLink, NavbarComponent, FormsModule],
})
export class CompaniesListComponent {
  companies: Employer[] = [];

  searchText = '';
  isSearching = false;

  currentPage = 1;
  itemsPerPage = 12;
  totalItems = 0;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private companyService: CompaniesService) {}

  ngOnInit(): void {
    this.getAllCompanies();

    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((search) => {
        this.currentPage = 1;
        this.getAllCompanies(search);
      });
  }

  getAllCompanies(searchTerm: string = ''): void {
    this.companyService
      .getCompanies({
        page: this.currentPage,
        limit: this.itemsPerPage,
        search: searchTerm,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.companies = response.data;
          this.totalItems = response.pagination.total;
        },
      });
  }

  onSearch(): void {
    this.isSearching = this.searchText.trim().length > 0;
    this.searchSubject.next(this.searchText.trim());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
