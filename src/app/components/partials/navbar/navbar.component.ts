import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';
import { CommonModule } from '@angular/common';

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
    this.isLoggedIn = this.localstorage.isLoggedIn('authToken');
    this.isUserLoggedIn = this.localstorage.isLoggedIn('userToken');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isLoggedIn = this.localstorage.isLoggedIn('authToken');
    this.isUserLoggedIn = this.localstorage.isLoggedIn('userToken');
  }
  logOut() {
    this.localstorage.removeItem('userToken');
    this.localstorage.removeItem('userID');
  }
}
