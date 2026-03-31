import { Component, OnChanges, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { User } from '../../../../../constants/interfaces/user.interface';
import { ObjectId } from 'mongoose';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  base_url,
  employer_job_base_url,
} from '../../../../../constants/url/urls';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.css',
})
export class CandidateProfileComponent implements OnInit {
  candidate!: any;
  profileImage: string = '';
  id!: ObjectId;
  jobId!:ObjectId;
  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.jobId = params['jobId']
     
      this.getCandidateDetails();
    });
    if (!this.id) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  getCandidateDetails() {
    this.http.get(employer_job_base_url + '/candidate/' + this.id).subscribe({
      next: (res: any) => {
        this.candidate = res.candidate[0];
       
        if (this.candidate.user_info.profilePic) {
          this.profileImage = this.candidate.user_info.profilePic;
        }

      },
      error: (err: any) => {
    
      },
    });
  }
  getImageUrl(path: string): string {
    return  path;
  }
}
