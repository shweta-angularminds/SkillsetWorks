import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLS } from '../../../core/constants/url/urls';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { HttpService } from '../../../core/services/http.service';
import { NotifyService } from '../../../core/services/notify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user!: string;
  isvisible: boolean = false;

  private readonly authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService,
    private localstorage: LocalstorageService,
    private notify: NotifyService,
    private activatedRouter: ActivatedRoute,
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

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const request$ =
      this.user === 'employer'
        ? this.authService.employerLogin(this.form.value)
        : this.authService.jobSeekerLogin(this.form.value);

    request$.subscribe({
      next: ({ token }) => {
        this.localstorage.setItem(this.getTokenKey(), token);

        this.notify.notifyMessage('success', 'Login Successful!');

        setTimeout(() => {
          this.router.navigateByUrl(this.getRedirectUrl());
        }, 1000);
      },
      error: () => {
        this.localstorage.removeItem(this.getTokenKey());
      },
    });
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

  private getTokenKey(): string {
    return this.user === 'employer' ? 'employerToken' : 'jobseekerToken';
  }

  private getRedirectUrl(): string {
    return this.user === 'employer'
      ? '/employer/profile'
      : '/jobseeker/profile';
  }
}
