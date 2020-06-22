import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/authentication.service';

import { Role } from '../../core/models/role';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formValidationService: FormValidationService
  ) { }

  ngOnInit() {
    this.signupForm = this.initForm();
  }

  initForm() {
    return this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: Role.Customer
    },
      {
        validator: this.formValidationService.matchPassword('password', 'confirmPassword'),
      });
  }

  signup() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value);
    }
  }

}
