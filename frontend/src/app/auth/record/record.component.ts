import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

interface RecordForm {
  login: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: 'app-record',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent {

  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);


  form = this._formBuilder.group<RecordForm>({
    login: this._formBuilder.nonNullable.control('', Validators.required),
    password: this._formBuilder.nonNullable.control('', Validators.required),
  });

  constructor() {}

  submit(){
    if (this.form.invalid) return;

    const {login, password} = this.form.getRawValue();

    this._authService.record(login, password).subscribe({
      next: (Response) => {
        this._router.navigateByUrl('/dashboard');
      },
      error: (error) => console.log(error),
    });
  }
}
