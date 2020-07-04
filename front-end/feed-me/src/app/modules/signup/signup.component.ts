import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/authentication.service';

import { Role } from '../../core/models/role.model';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formValidationService: FormValidationService
  ) { }

  ngOnInit() {
    this.error = "";
    this.signupForm = this.initForm();
  }

  initForm() {
    return this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      role: Role.Customer
    },
      {
        validator: this.formValidationService.matchPassword('password', 'confirmPassword'),
      });
  }

  signup() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value)
        .catch(error => {
          this.error = error;
        });
    }
  }

}
