import {
  BootstrapOptions,
  Component,
  OnDestroy,
  OnInit,
  VERSION,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from '../../../../../constants/interfaces/job.interface';
import { HttpService } from '../../../../services/http.service';
import {
  add_new_job_url,
  delete_job_url,
  get_all_active_jobs_url,
  get_applicants_count_url,
  profile_url,
  update_job_url,
} from '../../../../../constants/url/urls';
import { NotifyService } from '../../../../services/notify.service';

import { Editor, Toolbar } from 'ngx-editor';
import { schema } from 'ngx-editor/schema';

declare var bootstrap: any;
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.css',
})
export class JobComponent implements OnInit, OnDestroy {
  jobs!: Job[];
  applicants: any;
  inputs: string[] = [];
  jobForm: FormGroup;
  formData: any = {};
  Editor!: Editor;
  qualifications: string = '';
  html: string = '';
  employer_id!: string;
  isEditMode: boolean = false; // Track whether we're in edit mode
  currentJobId: string | null = null;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private notify: NotifyService
  ) {
    this.jobForm = this.fb.group({
      designation: ['', Validators.required],
      experience: ['', Validators.required],
      location: ['', Validators.required],
      workType: ['', Validators.required],
      salary: ['', Validators.required],
      positions: [
        '',
        [Validators.required, Validators.pattern('^\\d{1,2}$|^100$')],
      ],
      qualifications: ['', Validators.required],
      desc: ['', Validators.required],
      department: ['', Validators.required],
      industry: ['', Validators.required],
      skills: ['', Validators.required],
      employementType: ['', Validators.required],
    });
  }

  onValueChange(event: any) {
    this.formData[event.name] = event.value;
  }
  ngOnInit(): void {
    this.Editor = new Editor();
    this.getActiveJobs();
  }
  ngOnDestroy(): void {
    this.Editor.destroy();
  }

  getActiveJobs() {
    this.http.secureGet(get_all_active_jobs_url, 'authToken').subscribe({
      next: (res: Job[]) => {
        this.jobs = res;

        this.getTotalApplicants();
      },
      error: (error: any) => {
        
      },
    });
  }

  confirmDelete(id: string) {
    this.notify.confirmDelete().subscribe((result) => {
      if (result.isConfirmed) {
        this.deleteJob(id);
      }
    });
  }
  deleteJob(id: string) {
    const confirm = this.notify.confirmDelete();

    if (confirm) {
      this.http.delete(delete_job_url + id, 'authToken').subscribe({
        next: (res: any) => {
          this.notify.notifyMessage('success', res.message);
          this.getActiveJobs();
        },
        error: (error: any) => {
     
        },
      });
    }
  }
  editJob(job: Job): void {
    this.isEditMode = true;
    this.currentJobId = job._id;

    this.jobForm.patchValue({
      designation: job.designation,
      experience: job.experience,
      location: job.location,
      workType: job.workType,
      salary: job.salary,
      positions: job.positions,
      qualifications: job.qualifications.join(', '),
      desc: job.desc,
      department: job.department,
      industry: job.industry,
      skills: job.skills.join(', '),
      employementType: job.employementType,
    });

    const modal = new bootstrap.Modal(document.getElementById('jobModal')!);
    modal.show();
  }

  submit(): void {
    if (this.jobForm.invalid) {
      return;
    }
    this.jobForm.value.qualifications =
      this.jobForm.value.qualifications.split(',');
    this.jobForm.value.skills = this.jobForm.value.skills.split(',');

    const formData = {
      ...this.jobForm.value,
      employer_id: this.employer_id,
    };

    if (this.isEditMode && this.currentJobId) {
      this.http
        .securePut(update_job_url + this.currentJobId, formData)
        .subscribe({
          next: (res: any) => {
            this.notify.notifyMessage('success', 'Job updated successfully!');
            this.getActiveJobs();
            this.resetForm();
          },
          error: (error: any) => {
            console.error('Update failed', error);
            this.notify.notifyMessage('error', error.message);
          },
        });
    } else {
      this.http.securePost(add_new_job_url, formData).subscribe({
        next: (res: any) => {
          this.resetForm();
          this.notify.notifyMessage('success', 'Job Added Succesfully!');
          this.getActiveJobs();
        },
        error: (error: any) => {
   
          this.resetForm();
          this.notify.notifyMessage('error', error.message);
        },
      });
    }
  }
  resetForm() {
    this.jobForm.reset({
      designation: '',
      experience: '',
      location: '',
      workType: '',
      salary: '',
      positions: '',
      qualifications: '',
      desc: '',
      department: '',
      industry: '',
      skills: '',
      employementType: '',
    });
  }

  getTotalApplicants() {
    const jobIds = this.jobs.map((job) => job._id);

    this.http.post(get_applicants_count_url, { jobIds }).subscribe({
      next: (res: any) => {
        this.applicants = res;
      },
      error: (err: any) => {
        
      },
    });
  }
  getApplicantsCount(jobId: string): number {
    const applicants = this.applicants.result.find(
      (data: any) => data.job_Id === jobId
    );
    return applicants ? applicants.applicantsCount : 0;
  }
}
