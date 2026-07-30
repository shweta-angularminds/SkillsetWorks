import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { LocalstorageService } from '../../../core/services/localstorage.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule, CommonModule],
})
export class NavbarComponent implements OnInit, OnChanges {
  isLoggedIn: boolean = false;
  isUserLoggedIn: boolean = false;
  constructor(private localstorage: LocalstorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.localstorage.isLoggedIn('employerToken');
    this.isUserLoggedIn = this.localstorage.isLoggedIn('jobseekerToken');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoggedIn = this.localstorage.isLoggedIn('employerToken');
    this.isUserLoggedIn = this.localstorage.isLoggedIn('jobseekerToken');
  }

  logOut() {
    this.localstorage.removeItem('jobseekerToken');
    this.localstorage.removeItem('jobseekerId');
  }
}
