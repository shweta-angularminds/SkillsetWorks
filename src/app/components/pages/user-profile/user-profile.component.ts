import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { LocalstorageService } from '../../../services/localstorage.service';
import { NotifyService } from '../../../services/notify.service';
import { Router, RouterLink } from '@angular/router';
import {
  User,
  UserDetails,
} from '../../../../constants/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages/languages.component';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { PreferenceComponent } from './preference/preference.component';
import { SummaryComponent } from './summary/summary.component';

import { ApplicationsComponent } from './applications/applications.component';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { ProfileEditModalComponent } from './profile-edit-modal/profile-edit-modal.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileImageModalComponent } from './profile-image-modal/profile-image-modal.component';
import { ExperienceComponent } from './experience/experience.component';
import { UserProfileService } from '../../../services/user-profile.service';

import { formatDate } from '../../../utils/dateFormat';
import { DEFAULT_PROFILE_IMAGE } from '../../../../constants/data/variables';
import { getDownloadUrl } from '../../../utils/resumeDownload';
import { INITIAL_USER_DETAILS } from '../../../../constants/data/form-fields';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LanguagesComponent,
    SkillsComponent,
    EducationComponent,
    PreferenceComponent,
    SummaryComponent,
    ApplicationsComponent,
    NavbarComponent,
    RouterLink,
    ProfileEditModalComponent,
    ProfileHeaderComponent,
    ProfileImageModalComponent,
    ExperienceComponent,
  ],
})
export class UserProfileComponent implements OnInit {
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
    private userProfileService: UserProfileService,
  ) {}

  // Lifecycle hooks
  ngOnInit(): void {
    this.initializeForm();
    this.loadProfile();
  }

  // Load methods
  loadProfile() {
    forkJoin({
      profile: this.userProfileService.getProfile(),
      details: this.userProfileService.getUserDetails(),
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
    this.userProfileService.updateProfile(this.userForm.value).subscribe({
      next: ({ data }) => {
        this.user = data;

        this.notify.notifyMessage('success', 'Profile updated successfully');
      },

      error: (err) => {
        this.notify.notifyMessage('error', err.error.message);
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

    this.userProfileService.updateProfilePic(this.selectedFile).subscribe({
      next: () => {
        this.notify.notifyMessage('success', 'Profile picture updated');

        this.loadProfile();

        this.selectedFile = null;
      },

      error: (err) => this.notify.notifyMessage('error', err.error.message),
    });
  }

  deletePic(): void {
    this.userProfileService.deleteProfilePic().subscribe({
      next: () => {
        this.imageUrl = DEFAULT_PROFILE_IMAGE;

        this.notify.notifyMessage('success', 'Profile picture deleted');

        this.loadProfile();
      },

      error: (err) => this.notify.notifyMessage('error', err.error.message),
    });
  }

  // Resume methods
  updateResume(): void {
    if (!this.selectedFile) return;

    this.userProfileService
      .updateResume(this.user.id, this.selectedFile)
      .subscribe({
        next: () => {
          this.notify.notifyMessage('success', 'Resume updated successfully');

          this.selectedFile = null;

          this.loadProfile();
        },

        error: (err) => this.notify.notifyMessage('error', err.error.message),
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

      this.localstorage.removeItem('userToken');
      this.localstorage.removeItem('userID');

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
