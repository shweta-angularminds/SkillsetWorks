import { Component,Input } from '@angular/core';
import { JobSummary } from '../../../../core/constants/interfaces/job.interface';

@Component({
  standalone:true,
  selector: 'app-job-summary',
  templateUrl: './job-summary.component.html',
  styleUrl: './job-summary.component.css',
})
export class JobSummaryComponent {
  @Input()
  summary!: JobSummary;
}
