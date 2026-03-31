import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  standalone: true,
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.css',
  imports: [RouterModule],
})
export class SidenavbarComponent implements OnInit {
  Id: string = '';
  constructor(
    private router: Router,
    private localstorage: LocalstorageService
  ) {}
  ngOnInit(): void {}
  logOut() {
    this.localstorage.removeItem('authToken');
    this.router.navigateByUrl('/home');
  }
  toggleVisibility() {
    const element = document.getElementById('toggle-content');
    if (element) {
      element.classList.toggle('visible');
    }
  }
}
