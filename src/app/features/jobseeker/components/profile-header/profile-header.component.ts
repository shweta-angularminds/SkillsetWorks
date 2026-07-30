import { Component, Input } from '@angular/core';
import { User } from '../../../../core/constants/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { DEFAULT_PROFILE_IMAGE } from '../../../../core/constants/data/variables';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent {
  @Input()
  user!: User;

  get profileImage(): string {
    return this.user?.profilePic || DEFAULT_PROFILE_IMAGE;
  }
}
