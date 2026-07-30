import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-edit-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit-modal.component.html',
  styleUrl: './profile-edit-modal.component.css',
})
export class ProfileEditModalComponent {
  @Input() userForm!: FormGroup;

  @Output() save = new EventEmitter<void>();

  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  fresherOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  onSave() {
    this.save.emit();
  }

  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);

    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  hasError(controlName: string, error: string): boolean {
    return !!this.userForm.get(controlName)?.hasError(error);
  }
}
