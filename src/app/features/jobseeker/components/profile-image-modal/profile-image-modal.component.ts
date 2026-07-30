import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { User } from '../../../../core/constants/interfaces/user.interface';
import { DEFAULT_PROFILE_IMAGE } from '../../../../core/constants/data/variables';

@Component({
  selector: 'app-profile-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-image-modal.component.html',
  styleUrl: './profile-image-modal.component.css',
})
export class ProfileImageModalComponent {
  @Input() user!: User;
  @Input() imageUrl!: string | ArrayBuffer | null;

  @Output() upload = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<any>();

  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    this.fileSelected.emit(event);
  }

  onUpload() {
    this.upload.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  resetImage() {
    this.imageUrl = this.user?.profilePic || DEFAULT_PROFILE_IMAGE;
  }
}
