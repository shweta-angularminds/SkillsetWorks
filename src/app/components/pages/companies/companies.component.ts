import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { employer_url } from '../../../../constants/url/urls';
import { employer } from '../../../../constants/interfaces/employer.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { NotifyService } from '../../../services/notify.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css',
  imports: [CommonModule, RouterLink, NavbarComponent],
})
export class CompaniesComponent implements OnInit {
  companies: employer[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpService,
    private notify: NotifyService,
  ) {}

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.http
      .get<employer[]>(employer_url)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.companies = res;
        },
        error: (err: any) => {
          this.notify.notifyMessage('error', 'Please try again later!');
        },
      });
  }
}
