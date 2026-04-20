import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, SlicePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DateDiffPipe } from '../../../pipes/date-diff.pipe';
import { get_all_jobs } from '../../../../constants/url/urls';
import { Job } from '../../../../constants/interfaces/job.interface';

@Component({
  standalone: true,
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
  imports: [
    NavbarComponent,
    RouterLink,
    NgIf,
    NgFor,
    FormsModule,
    DateDiffPipe,
    TitleCasePipe,
  ],
})
export class JobsComponent implements OnInit {
  searchTerm: string = '';
  jobs: Job[] = [];
  filters = {
    location: '',
    experience: '',
    employementType: '',
  };

  private debounceTimer: any;
  ngOnInit() {
    this.searchJobs();
  }
  onSearchChange() {
    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.searchJobs();
    }, 1000); // 500ms delay
  }
  private http = inject(HttpService);
  searchJobs() {
    const queryParams = {
      params: {
        search: this.searchTerm || '',
        location: this.filters.location || '',
        experience: this.filters.experience || '',
        employementType: this.filters.employementType || '',
      },
    };
    this.http.get(get_all_jobs, queryParams).subscribe((res: any) => {
      this.jobs = res.data;
    });
  }
  clearFilters() {
    this.searchTerm = '';

    this.filters = {
      location: '',
      experience: '',
      employementType: '',
    };

    this.searchJobs();
  }
}
