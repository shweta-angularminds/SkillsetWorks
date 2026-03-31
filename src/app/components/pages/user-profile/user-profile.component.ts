import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../../../services/http.service';
import {
  base_url,
  download_resume_url,
  user_delete_profile_pic_url,
  user_profile_update_url,
  user_profile_url,
  user_update_profile_pic_url,
  user_url,
} from '../../../../constants/url/urls';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LocalstorageService } from '../../../services/localstorage.service';
import { NotifyService } from '../../../services/notify.service';
import { Router } from '@angular/router';
import { Education } from '../../../../constants/interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  user: any;
  userForm: FormGroup;
  details: any;
  education!: Education | null;
  languages!: string[];
  imageUrl: string | ArrayBuffer | null = null;
  isEdit: boolean = true;
  selectedFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef | undefined;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private localstorage: LocalstorageService,
    private notify: NotifyService,
    private router: Router,
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      bdate: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadUserProfile();
  }
  ngAfterViewInit(): void {
    if (!this.fileInput) {
     
    }
  }
  loadUserProfile() {
    this.http.secureGet(user_profile_url, 'userToken').subscribe({
      next: (res: any) => {
        this.user = res.user;
      
        this.userForm.setValue({
          username: this.user.username || '',
          email: this.user.email || '',
          location: this.user?.location || '',
          bdate: this.user.bdate ? this.formatDate(this.user.bdate) : '',
          contactNumber: this.user.contactNumber || '',
          gender: this.user.gender || '',
        });

        if (this.user.profilePic) {
          this.imageUrl = this.getImageUrl(this.user.profilePic);
        } else {
          this.imageUrl = '/assets/images/profile-back.jpg';
        }

        if (this.user?.id) {
          this.getUserDetails();
        }
        this.localstorage.setItem('userID', this.user.id);
      },
      error: (err: any) => {
        this.notify.notifyMessage('error', err.message);
        if (err.status === 403) {
          this.localstorage.removeItem('userToken');
        }

        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 1000);
       
      },
    });
  }

  getUserDetails() {
    this.http
      .get(
        'https://jobportal-backend-zmjx.onrender.com/skillset/jobseeker/' +
          this.user.id +
          '/details',
      )
      .subscribe({
        next: (res: any) => {
          this.details = res[0];

          this.education = this.details.education;
          if (!this.education) {
            this.education = null;
          }
          this.languages = this.details.languages;
        },
        error: (err: any) => {
          this.notify.notifyMessage('error', 'something went wrong!');
          
        },
      });
  }
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  }
  editProfile() {
    const formData = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      phone: this.userForm.value.contactNumber,
      location: this.userForm.value.location,
      bdate: this.userForm.value.bdate,
      gender: this.userForm.value.gender,
    };

    this.http.patch(user_profile_update_url, formData, 'userToken').subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'Profile Updated Successsfully');

        this.localstorage.setItem('userToken', res.token);

        setTimeout(() => {
          this.loadUserProfile();
        }, 1000);
      },
      error: (err: any) => {
        this.notify.notifyMessage('error', err.message);
      },
    });
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

  updatePic() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('profilePic', this.selectedFile, this.selectedFile.name);
    }
    this.http
      .patch(user_update_profile_pic_url, formData, 'userToken')
      .subscribe({
        next: (res: any) => {
          this.notify.notifyMessage(
            'success',
            'profile picture updated succesfully!',
          );
          this.localstorage.setItem('userToken', res.token);
          setTimeout(() => {
            this.loadUserProfile();
          }, 1000);
        },
        error: (error: any) => {
          this.notify.notifyMessage('error', error.message);
        },
      });
  }

  deletePic() {
    alert();
    this.http.delete(user_delete_profile_pic_url, 'userToken').subscribe({
      next: (res: any) => {
        this.notify.notifyMessage(
          'success',
          'Profile picture deleted successfully!',
        );

        this.localstorage.setItem('userToken', res.token);
        this.loadUserProfile();
      },
      error: (err: any) => {
        this.notify.notifyMessage('error', err.message);
      },
    });
  }

  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('File input is not initialized');
    }
  }

  getImageUrl(path: string): string {
    return path;
  }

  downloadResume(resumeUrl: string) {
    if (!resumeUrl) return;
    window.open(resumeUrl, '_blank');
    // const fileName = resumeUrl.split('/').pop(); 

    // const a = document.createElement('a');
    // a.href = resumeUrl;
    // a.download = fileName || 'resume.pdf';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  }

  updateResume() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();

    formData.append('resume', this.selectedFile, this.selectedFile.name);

    this.http
      .Patch(user_url + '/' + this.user.id + '/update-resume', formData)
      .subscribe({
        next: (res: any) => {
          this.notify.notifyMessage('success', 'Resume updated successfully!');
        },
        error: (err: any) => {
          this.notify.notifyMessage('error', err.message);
        },
      });
  }

  get email() {
    return this.userForm.get('email')!;
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
  get username() {
    return this.userForm.get('username');
  }
}
