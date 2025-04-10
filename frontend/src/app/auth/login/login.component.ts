import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);

  form = this._formBuilder.group<LoginForm>({
    login: this._formBuilder.nonNullable.control('', Validators.required),
    password: this._formBuilder.nonNullable.control('', Validators.required),
  });

  constructor() {}

  submit() {
    if (this.form.invalid) return;
    const { login, password } = this.form.getRawValue();

    this._authService.login(login, password).subscribe({
      next: (Response) => {
        this._router.navigateByUrl('/dashboard');
      },
      error: (error) => console.log(error),
    });
  }
}
