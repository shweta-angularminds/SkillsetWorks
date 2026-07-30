import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Employer } from '../../../../core/constants/interfaces/employer.interface';
import { EmployerService } from '../../services/employer.service';
import { LocalstorageService } from '../../../../core/services/localstorage.service';
import { NotifyService } from '../../../../core/services/notify.service';
import { showError } from '../../../../shared/utils/errorHandler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  employer!: Employer;

  imageUrl: string | ArrayBuffer | null = null;

  selectedFile: File | null = null;

  profileForm = this.createForm();

  private readonly router = inject(Router);
  private readonly employerService = inject(EmployerService);
  private readonly notify = inject(NotifyService);
  private readonly localstorage = inject(LocalstorageService);

  ngOnInit(): void {
    this.loadEmployer();
  }

  // ===================== PUBLIC METHODS =====================

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result;
    };

    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.employerService.updateEmployerProfile(this.buildFormData()).subscribe({
      next: ({ data }) => {
        this.employer = data;
        this.patchEmployer(data);

        this.notify.notifyMessage('success', 'Profile Updated Successfully!');
      },
      error: (err) => {
        showError(this.notify,err)
      },
    });
  }

  resetForm(): void {
    this.patchEmployer(this.employer);
  }

  // ===================== PRIVATE METHODS =====================

  private createForm(): FormGroup {
    return new FormGroup({
      companyName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),

      employerName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-z\\s]{3,20}$'),
      ]),

      email: new FormControl('', [Validators.required, Validators.email]),

      address: new FormControl('', Validators.required),

      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),

      website: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/,
        ),
      ]),

      companyLogo: new FormControl('', Validators.required),
    });
  }

  private loadEmployer(): void {
    this.employerService.getEmployerDetails().subscribe({
      next: (employer) => {
        this.employer = employer;
        this.patchEmployer(employer);
      },
      error: () => {
        this.notify.notifyMessage(
          'error',
          'Your session has expired. Please login again.',
        );

        this.localstorage.removeItem('employerToken');

        this.router.navigateByUrl('auth/login/employer');
      },
    });
  }

  private patchEmployer(employer: Employer): void {
    this.profileForm.patchValue({
      companyName: employer.companyName,
      employerName: employer.employer_name,
      email: employer.email,
      address: employer.address,
      contactNumber: employer.contactNumber,
      website: employer.website,
      companyLogo: employer.companyLogo,
    });

    this.imageUrl = employer.companyLogo;
  }

  private buildFormData(): FormData {
    const formData = new FormData();

    formData.append('companyName', this.profileForm.value.companyName);

    formData.append('employer_name', this.profileForm.value.employerName);

    formData.append('email', this.profileForm.value.email);

    formData.append('address', this.profileForm.value.address);

    formData.append('contactNumber', this.profileForm.value.contactNumber);

    formData.append('website', this.profileForm.value.website);

    if (this.selectedFile) {
      formData.append('companyLogo', this.selectedFile, this.selectedFile.name);
    }

    return formData;
  }

  // ===================== GETTERS =====================

  get companyName() {
    return this.profileForm.get('companyName')!;
  }

  get employerName() {
    return this.profileForm.get('employerName')!;
  }

  get email() {
    return this.profileForm.get('email')!;
  }

  get address() {
    return this.profileForm.get('address')!;
  }

  get contactNumber() {
    return this.profileForm.get('contactNumber')!;
  }

  get website() {
    return this.profileForm.get('website')!;
  }
}
