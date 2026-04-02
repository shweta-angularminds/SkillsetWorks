import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Application } from '../../../../constants/interfaces/application.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrl: './view-applications.component.css',
  imports:[CommonModule,RouterModule]
})
export class ViewApplicationsComponent implements OnInit {
  @Input()
  application!: Application;
 
  constructor(private http: HttpService) {}

  ngOnInit(): void {}
}
