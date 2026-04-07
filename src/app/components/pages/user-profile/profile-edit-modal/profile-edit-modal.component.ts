import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-edit-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile-edit-modal.component.html',
  styleUrl: './profile-edit-modal.component.css'
})
export class ProfileEditModalComponent {
@Input() userForm!: FormGroup;

  @Output() save = new EventEmitter<void>();

  onSave() {
    this.save.emit();
  }

  // getters (so your template works)
  get username() {
    return this.userForm.get('username');
  }
  get email() {
    return this.userForm.get('email');
  }
  get contactNumber() {
    return this.userForm.get('contactNumber');
  }
  get location() {
    return this.userForm.get('location');
  }
  get gender() {
    return this.userForm.get('gender');
  }
  get bdate() {
    return this.userForm.get('bdate');
  }
}
