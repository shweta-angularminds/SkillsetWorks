import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateProfile } from '../../../../core/constants/interfaces/user.interface';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.css',
})
export class CandidateProfileComponent implements OnInit {
  candidate!: CandidateProfile;
  profileImage: string = '';
  candidateId!: string;
  jobId!: string;

  private employerService = inject(EmployerService);
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.candidateId = params['id'];
      this.jobId = params['jobId'];

      this.loadCandidate();
    });
    if (!this.candidateId) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  private loadCandidate(): void {
    this.employerService
      .getCandidateProfile(this.jobId, this.candidateId)
      .subscribe({
        next: ({ data }) => {
          this.candidate = data;
          this.profileImage = data.user_info?.profilePic ?? '';
        },
        error: (err) => console.error(err),
      });
  }
}
