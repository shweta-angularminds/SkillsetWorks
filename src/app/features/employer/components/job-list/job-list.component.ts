import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../../../core/constants/interfaces/job.interface';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css',
})
export class JobListComponent {
  @Input() jobs: Job[] = [];

  @Output() addNew = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Job>();
  @Output() delete = new EventEmitter<string>();
}
