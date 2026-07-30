import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifyService } from '../../../../core/services/notify.service';
import { passwordMatchValidator } from '../../../../shared/Validators/passwordMatch.validator';
import { passwordValidator } from '../../../../shared/Validators/passwordValidator';
import { EmployerService } from '../../services/employer.service';
import { showError } from '../../../../shared/utils/errorHandler';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  private readonly employerService = inject(EmployerService);
  private readonly notify = inject(NotifyService);

  profileForm: FormGroup;

  constructor() {
    this.profileForm = new FormGroup(
      {
        password: new FormControl('', Validators.required),
        newPassword: new FormControl('', [
          Validators.required,
          passwordValidator,
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      [passwordMatchValidator('newPassword', 'confirmPassword')],
    );
  }

  get passwordInvalid() {
    return this.profileForm.get('newPassword')?.hasError('passwordStrength');
  }

  //updating password
  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const { password, newPassword } = this.profileForm.value;

    this.employerService
      .updatePassword({
        password,
        newPassword,
      })
      .subscribe({
        next: () => {
          this.notify.notifyMessage(
            'success',
            'Password Updated Successfully!',
          );

          this.clearFields();
        },
        error: (err) => {
          showError(this.notify, err);

          this.clearFields();
        },
      });
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
}
