import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import {
  JobRequest,
  Job,
} from '../../../../core/constants/interfaces/job.interface';

declare var bootstrap: any;

export interface JobFormSaveEvent {
  payload: JobRequest;
  jobId: string | null;
}

@Component({
  selector: 'app-job-form-modal',
  templateUrl: './job-form-modal.component.html',
  styleUrl: './job-form-modal.component.css',
})
export class JobFormModalComponent {
  @ViewChild('jobModal', { static: true })
  private modalElRef!: ElementRef<HTMLElement>;

  @Output() save = new EventEmitter<JobFormSaveEvent>();

  jobForm: FormGroup;
  editor!: Editor;
  isEditMode = false;

  private currentJobId: string | null = null;
  private modalInstance: any;

  readonly toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  private readonly fb = inject(FormBuilder);

  constructor() {
    this.jobForm = this.buildForm();
  }

  ngOnInit(): void {
    this.editor = new Editor();

    this.modalElRef.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.resetForm();
      this.isEditMode = false;
      this.currentJobId = null;
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  openForCreate(): void {
    this.isEditMode = false;
    this.currentJobId = null;
    this.resetForm();
    this.openModal();
  }

  openForEdit(job: Job): void {
    this.isEditMode = true;
    this.currentJobId = job._id;
    this.fillForm(job);
    this.openModal();
  }

  closeModal(): void {
    this.resetForm();
    this.isEditMode = false;
    this.currentJobId = null;
    this.modalInstance?.hide();
  }

  submit(): void {
    if (this.jobForm.invalid) {
      return;
    }

    this.save.emit({
      payload: this.buildJobRequest(),
      jobId: this.currentJobId,
    });
  }

  resetForm(): void {
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

  private buildForm(): FormGroup {
    return this.fb.group({
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

  private buildJobRequest(): JobRequest {
    const value = this.jobForm.value;

    return {
      ...value,
      qualifications: value.qualifications
        .split(',')
        .map((q: string) => q.trim()),
      skills: value.skills.split(',').map((s: string) => s.trim()),
    };
  }

  private fillForm(job: Job): void {
    this.jobForm.patchValue({
      designation: job.designation,
      experience: job.experience,
      location: job.location,
      workType: job.workType,
      salary: job.salary,
      positions: job.positions,
      qualifications: job.qualifications.join(', '),
      skills: job.skills.join(', '),
      department: job.department,
      industry: job.industry,
      desc: job.desc,
      employementType: job.employementType,
    });
  }

  private openModal(): void {
    this.modalInstance = new bootstrap.Modal(this.modalElRef.nativeElement);
    this.modalInstance.show();
  }
}
