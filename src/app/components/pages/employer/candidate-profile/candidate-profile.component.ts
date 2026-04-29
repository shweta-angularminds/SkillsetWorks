import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { CandidateProfile } from '../../../../../constants/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {
  employer_job_base_url,
} from '../../../../../constants/url/urls';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.css',
})
export class CandidateProfileComponent implements OnInit {
  candidate!: CandidateProfile;
  profileImage: string = '';
  id!: string;
  jobId!: string;
  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.jobId = params['jobId'];

      this.getCandidateDetails();
    });
    if (!this.id) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  getCandidateDetails() {
    this.http
      .get<{
        candidate: CandidateProfile[];
      }>(employer_job_base_url + '/candidate/' + this.id)
      .subscribe({
        next: (res) => {
          if (res.candidate?.length > 0) {
            this.candidate = res.candidate[0];

            this.profileImage = this.candidate.user_info?.profilePic || '';
          }
        },
        error: (err: any) => {},
      });
  }
}
