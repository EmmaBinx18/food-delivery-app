import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { Role } from '../../core/models/role.enum';
import { CommonService } from 'src/app/core/services/common.service';

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
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.error = '';
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
<<<<<<< HEAD
      phone: ['', Validators.required],
=======
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      role: Role.Customer
    },
      {
        validator: this.commonService.matchPassword('password', 'confirmPassword'),
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
