import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.error = '';
    this.initForm();
  }

  initForm() {
<<<<<<< HEAD
    return this.formBuilder.group({
=======
    this.loginForm = this.formBuilder.group({
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}')]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.authService.login(this.loginForm.value)
      .catch(error => {
        this.error = error;
      });
  }

}
