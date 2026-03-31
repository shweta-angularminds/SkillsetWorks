import { Component, NgZoneOptions, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { employer } from '../../../../../constants/interfaces/employer.interface';
import {
  base_url,
  profile_update_url,
  profile_url,
} from '../../../../../constants/url/urls';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifyService } from '../../../../services/notify.service';
import { LocalstorageService } from '../../../../services/localstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  employer!: employer;
  imageUrl: string | ArrayBuffer | null = null;
  Id: string = '';
  profileForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private http: HttpService,

    private notify: NotifyService,
    private localstorage: LocalstorageService
  ) {
    this.profileForm = new FormGroup({
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
      address: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      website: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/
        ),
      ]),
      companyLogo: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getEmployerDetails();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getEmployerDetails() {
    this.http.secureGet(profile_url, 'authToken').subscribe({
      next: (res: any) => {
        this.employer = res.user;

        this.profileForm.setValue({
          companyName: this.employer.companyName,
          employerName: this.employer.employer_name,
          email: this.employer.email,
          address: this.employer.address,
          contactNumber: this.employer.contactNumber,
          website: this.employer.website,
          companyLogo: this.employer.companyLogo,
        });
        this.imageUrl = this.getImageUrl(this.employer.companyLogo);
      },
      error: (err: any) => {
      
      },
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('companyName', this.profileForm.value.companyName);
      formData.append('employer_name', this.profileForm.value.employerName);
      formData.append('email', this.profileForm.value.email);
      formData.append('address', this.profileForm.value.address);
      formData.append('contactNumber', this.profileForm.value.contactNumber);
      formData.append('website', this.profileForm.value.website);

      // If a new file is selected, append it to the formData
      if (this.selectedFile) {
        formData.append(
          'companyLogo',
          this.selectedFile,
          this.selectedFile.name
        );
      }

      this.http.securePut(profile_update_url, formData).subscribe({
        next: (res) => {
          this.localstorage.setItem('authToken', res.token);

          this.notify.notifyMessage('success', 'Profile Updated Successfully!');
          this.getEmployerDetails();
        },
        error: (err: any) => {
          this.notify.notifyMessage('error', 'Error to update profile!');
          //console.error('Error updating employer:', err);
        },
      });
    }
  }

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

  resetForm() {
    this.getEmployerDetails();
  }
  getImageUrl(path: string): string {
    return base_url + path;
  }
}
