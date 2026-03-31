import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { employer_url } from '../../../../constants/url/urls';
import { employer } from '../../../../constants/interfaces/employer.interface';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css',
})
export class CompaniesComponent implements OnInit {
  companies: employer[] = [];
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.http.get(employer_url).subscribe({
      next: (res: employer[]) => {
        this.companies = res;
      },
      error: (err: any) => {
        
      },
    });
  }
  getImageUrl(path: string): string {
    return `http://localhost:5000/${path}`;
  }
}
