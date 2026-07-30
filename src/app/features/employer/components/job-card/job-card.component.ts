import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../../../core/constants/interfaces/job.interface';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input({ required: true }) job!: Job;

  @Output() edit = new EventEmitter<Job>();
  @Output() delete = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.job);
  }

  onDelete(): void {
    this.delete.emit(this.job._id);
  }
}
