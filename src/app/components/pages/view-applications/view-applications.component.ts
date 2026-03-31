import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Application } from '../../../../constants/interfaces/application.interface';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrl: './view-applications.component.css',
})
export class ViewApplicationsComponent implements OnInit {
  @Input()
  application!: Application;
 
  constructor(private http: HttpService) {}

  ngOnInit(): void {}
}
