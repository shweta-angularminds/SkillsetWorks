import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../../services/http.service';
import { employer } from '../../../../../constants/interfaces/employer.interface';
import { employer_url } from '../../../../../constants/url/urls';

@Component({
  selector: 'app-emp-navbar',
  templateUrl: './emp-navbar.component.html',
  styleUrl: './emp-navbar.component.css',
})
export class EmpNavbarComponent implements OnInit {
  ID: string = '';
  employer!: employer;
  constructor( private http: HttpService) {}
  ngOnInit(): void {
  
    this.getEmployerDetails();
  }
  getEmployerDetails() {
    this.http.get(`${employer_url}/${this.ID}`).subscribe({
      next: (res: employer) => {
        this.employer = res;
        
      },
      error: (err: any) => {
       
      },
    });
  }
}
