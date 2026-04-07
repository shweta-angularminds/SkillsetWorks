import { Component, Input } from '@angular/core';
import { Education } from '../../../../../constants/interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent {
  @Input()
  user: any;
  @Input()
  education!: Education | null;
}
