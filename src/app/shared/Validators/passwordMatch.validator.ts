import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(
  newPasswordControlName: string,
  confirmPasswordControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get(newPasswordControlName);
    const confirmPassword = control.get(confirmPasswordControlName);
    if (
      newPassword &&
      confirmPassword &&
      newPassword.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
