// Angular core
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// Angular modules
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// RxJS
import { forkJoin } from 'rxjs';

// Interfaces
import {
  User,
  UserDetails,
} from '../../../../core/constants/interfaces/user.interface';
// Constants
import { DEFAULT_PROFILE_IMAGE } from '../../../../core/constants/data/variables';
import { INITIAL_USER_DETAILS } from '../../../../core/constants/data/form-fields';

// Services

// Utilities
import { formatDate } from '../../../../shared/utils/dateFormat';
import { getDownloadUrl } from '../../../../shared/utils/resumeDownload';

// Child components
import { ViewApplicationsComponent } from '../../../applications/pages/applications/view-applications.component';
import { EducationComponent } from '../../components/education/education.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { LanguagesComponent } from '../../components/languages/languages.component';
import { PreferenceComponent } from '../../components/preference/preference.component';
import { ProfileEditModalComponent } from '../../components/profile-edit-modal/profile-edit-modal.component';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { ProfileImageModalComponent } from '../../components/profile-image-modal/profile-image-modal.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { SummaryComponent } from '../../components/summary/summary.component';

// Shared components
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { LocalstorageService } from '../../../../core/services/localstorage.service';
import { NotifyService } from '../../../../core/services/notify.service';
import { JobseekerService } from '../../services/jobseeker.service';
@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LanguagesComponent,
    SkillsComponent,
    EducationComponent,
    PreferenceComponent,
    SummaryComponent,

    NavbarComponent,
    RouterLink,
    ProfileEditModalComponent,
    ProfileHeaderComponent,
    ProfileImageModalComponent,
    ExperienceComponent,
    ViewApplicationsComponent,
  ],
})
export class ProfileComponent implements OnInit {
  // Inputs
  @ViewChild('fileInput') fileInput!: ElementRef | undefined;

  //state
  user!: User;
  details: UserDetails = INITIAL_USER_DETAILS;
  userForm!: FormGroup;
  imageUrl = DEFAULT_PROFILE_IMAGE;
  selectedFile: File | null = null;
  isEdit = true;

  constructor(
    private fb: FormBuilder,
    private localstorage: LocalstorageService,
    private notify: NotifyService,
    private router: Router,
    private JobseekerService: JobseekerService,
  ) {}

  // Lifecycle hooks
  ngOnInit(): void {
    this.initializeForm();
    this.loadProfile();
  }

  // Load methods
  loadProfile() {
    forkJoin({
      profile: this.JobseekerService.getProfile(),
      details: this.JobseekerService.getUserDetails(),
    }).subscribe({
      next: ({ profile, details }) => {
        this.user = profile.data;
        this.details = details.data;

        this.patchUserForm();
        this.setProfileImage();
      },
      error: (err) => this.handleProfileError(err),
    });
  }

  // Form methods
  private initializeForm(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      bdate: ['', Validators.required],
      fresher: [false],
    });
  }

  private patchUserForm(): void {
    const { username, email, phone, location, gender, fresher, bdate } =
      this.user;

    this.userForm.patchValue({
      username,
      email,
      phone,
      location,
      gender,
      fresher,
      bdate: bdate ? formatDate(bdate) : '',
    });
  }

  editProfile(): void {
    this.JobseekerService.updateProfile(this.userForm.value).subscribe({
      next: ({ data }) => {
        this.user = data;

        this.notify.notifyMessage('success', 'Profile updated successfully');
      },
    });
  }

  // Image methods
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };

    reader.readAsDataURL(this.selectedFile);
  }

  updatePic(): void {
    if (!this.selectedFile) return;

    this.JobseekerService.updateProfilePic(this.selectedFile).subscribe({
      next: ({ data }) => {
        this.notify.notifyMessage('success', 'Profile picture updated');
        this.user.profilePic = data.profilePic;

        this.selectedFile = null;
      },
    });
  }

  deletePic(): void {
    this.JobseekerService.deleteProfilePic().subscribe({
      next: () => {
        this.imageUrl = DEFAULT_PROFILE_IMAGE;
        this.user.profilePic = '';
        this.notify.notifyMessage('success', 'Profile picture deleted');
      },
    });
  }

  // Resume methods
  updateResume(): void {
    if (!this.selectedFile) return;

    this.JobseekerService.updateResume(this.selectedFile).subscribe({
      next: ({ data }) => {
        this.notify.notifyMessage('success', 'Resume updated successfully');

        this.selectedFile = null;

        this.user.resume = data.resume;
      },
    });
  }

  downloadResume(resumeUrl?: string, candidateName?: string) {
    if (!resumeUrl || !candidateName) {
      return;
    }

    window.open(getDownloadUrl(resumeUrl, candidateName), '_blank');
  }

  // Utiltiy methods
  private setProfileImage(): void {
    this.imageUrl = this.user.profilePic
      ? this.user.profilePic
      : DEFAULT_PROFILE_IMAGE;
  }

  private handleProfileError(err: any): void {
    if (err.status === 401 || err.status === 403) {
      this.notify.notifyMessage(
        'error',
        'Your session has expired. Please login again.',
      );

      this.localstorage.removeItem('jobseekerToken');
      this.localstorage.removeItem('jobseekerId');

      this.router.navigateByUrl('/auth/login/jobseeker');

      return;
    }

    this.notify.notifyMessage(
      'error',
      'Unable to load profile. Please try again later.',
    );

    this.router.navigateByUrl('/home');
  }
}
