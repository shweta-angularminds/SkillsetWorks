import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import {
  employer_login_url,
  employer_url,
  user_login_url,
} from '../../../../../constants/url/urls';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { NotifyService } from '../../../../services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user!: string;
  isvisible: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService,
    private localstorage: LocalstorageService,
    private notify: NotifyService,
    private activatedRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.user = params['user'];
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const loginData = this.form.value;
    if (this.user === 'employer') {
      this.http.post(employer_login_url, loginData).subscribe({
        next: (res: any) => {
          const token = res.token;
          this.localstorage.setItem('authToken', token);
          this.notify.notifyMessage('success', 'Login Successful!');

          setTimeout(() => {
            this.router.navigateByUrl('/employer/profile');
          }, 1000);
        },
        error: (err) => {
          
          this.notify.notifyMessage('error', err.error);
        },
      });
    } else {
      this.http.post(user_login_url, loginData).subscribe({
        next: (res: any) => {
          const token = res.token;
          this.localstorage.setItem('userToken', token);
          this.notify.notifyMessage('success', 'Login Succesful!');
          setTimeout(() => {
            this.router.navigateByUrl('/jobseeker/profile');
          }, 1000);
        },
        error: (err: any) => {
      
          this.notify.notifyMessage('error', err.error);
        },
      });
    }
  }

  toggleVisibility() {
    this.isvisible = !this.isvisible;
    const inputElement = document.getElementById('exampleInputPassword1');
    if (inputElement) {
      (inputElement as HTMLInputElement).type = this.isvisible
        ? 'text'
        : 'password';
    } else {
      console.error('Element not found');
    }
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
