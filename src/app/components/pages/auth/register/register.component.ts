import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../../../../services/notify.service';
import { passwordValidator } from '../../../../Validators/passwordValidator';
import {
  employer_register_url,
  user_register_url,
} from '../../../../../constants/url/urls';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  userForm: FormGroup;
  isvisible: boolean = false;
  selectedFile: File | null = null;
  isFresher: boolean = true;
  user!: string;
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private notify: NotifyService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      employer_name: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z\\s]{3,20}$')],
      ],
      companyName: ['', Validators.required],

      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      website: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/
          ),
        ],
      ],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
    });

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pwd: ['', [Validators.required, passwordValidator]],
      resume: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.user = params['user'];
    });
  }

  get passwordInvalid() {
    return this.form.get('password')?.hasError('passwordStrength');
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();

    Object.keys(this.form.value).forEach((key) => {
      formData.append(key, this.form.value[key]);
    });

    if (this.selectedFile) {
      formData.append('companyLogo', this.selectedFile, this.selectedFile.name);
    }

    this.registerEmployer(formData);
  }

  registerEmployer(formData: FormData) {
    this.http.post(employer_register_url, formData).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'Register Successful!');

        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 1000);
      },
      error: (err: any) => {
        this.notify.notifyMessage('error', err.error.message);
      },
    });
  }
  registerUser() {
    if (this.userForm.invalid) {
      return;
    }

    const formData = new FormData();

    const fieldMappings: any = {
      username: 'username',
      pwd: 'password',
      userEmail: 'email',
      phone: 'phone',
    };

    Object.keys(this.userForm.value).forEach((key) => {
      const backendFieldName = fieldMappings[key] || key;
      formData.append(backendFieldName, this.userForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('resume', this.selectedFile, this.selectedFile.name);
    }

    formData.append('fresher', String(this.isFresher));
    const obj: any = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });

    this.http.post(user_register_url, formData).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'Registered Succesfull!');
        this.userForm.reset();
      },
      error: (err: any) => {
       
        this.notify.notifyMessage('error', err.message);
        this.userForm.reset();
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
  get employer_name() {
    return this.form.get('employer_name');
  }
  get companyName() {
    return this.form.get('companyName');
  }
  get companyLogo() {
    return this.form.get('companyLogo');
  }
  get website() {
    return this.form.get('website');
  }
  get address() {
    return this.form.get('address');
  }
  get contactNumber() {
    return this.form.get('contactNumber');
  }

  get username() {
    return this.userForm.get('username');
  }
  get userEmail() {
    return this.userForm.get('userEmail');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get pwd() {
    return this.userForm.get('pwd');
  }
  get resume() {
    return this.userForm.get('resume');
  }
}
