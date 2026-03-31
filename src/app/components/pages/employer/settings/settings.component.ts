import { Component, OnInit } from '@angular/core';
import { employer } from '../../../../../constants/interfaces/employer.interface';
import { HttpService } from '../../../../services/http.service';
import {
  base_url,
  password_change_url,
  profile_url,
} from '../../../../../constants/url/urls';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifyService } from '../../../../services/notify.service';
import { passwordMatchValidator } from '../../../../Validators/passwordMatch.validator';
import { passwordValidator } from '../../../../Validators/passwordValidator';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  employer!: employer;
  Id: string = '';
  profileForm: FormGroup;

  constructor(private http: HttpService, private notify: NotifyService) {
    this.profileForm = new FormGroup(
      {
        password: new FormControl('', Validators.required),
        newPassword: new FormControl('', [
          Validators.required,
          passwordValidator,
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      [passwordMatchValidator('newPassword', 'confirmPassword')]
    );
  }

  ngOnInit(): void {
    this.getEmployerDetails();
  }

  get passwordInvalid() {
    return this.profileForm.get('newPassword')?.hasError('passwordStrength');
  }

  getEmployerDetails() {
    this.http.secureGet(profile_url, 'authToken').subscribe({
      next: (res: any) => {
        this.employer = res.user;
      },
      error: (err: any) => {
        this.notify.notifyMessage('error', err.error.message);
     
      },
    });
  }

  //updating password
  onSubmit() {
    if (this.profileForm.valid) {
      const { password, newPassword, confirmPassword } = this.profileForm.value;

      if (newPassword !== confirmPassword) {
        this.notify.notifyMessage(
          'error',
          'New password and confirm password do not match!'
        );
        return;
      }

      const payload = {
        password: password,
        newPassword: newPassword,
      };

      this.http.securePut(password_change_url, payload).subscribe({
        next: (res: any) => {
          this.notify.notifyMessage('success', 'Password Updated Succesfully!');
          this.clearFields();
        },
        error: (err: any) => {
          console.error('Error changing password', err);

          this.notify.notifyMessage('error', err.error);
          this.clearFields();
        },
      });
    }
  }

  //clear the form
  clearFields() {
    this.profileForm.reset({
      password: '',
      newPassword: '',
      confirmPassword: '',
    });
  }

  get password() {
    return this.profileForm.get('password')!;
  }

  get newPassword() {
    return this.profileForm.get('newPassword')!;
  }

  get confirmPassword() {
    return this.profileForm.get('confirmPassword')!;
  }

  get passwordFormField() {
    return this.profileForm.get('newPassword');
  }

  getImageUrl(path: string): string {
    return base_url + path;
  }
}
