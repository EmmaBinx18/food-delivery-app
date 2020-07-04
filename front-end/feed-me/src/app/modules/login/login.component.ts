import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { MapboxService } from 'src/app/core/services/mapbox.service';

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
    private authService: AuthService,
    // private mapService : MapboxService
  ) { }

  ngOnInit() {
    this.error = "";
    this.loginForm = this.initForm();
  }

  initForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}')]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.authService.login(this.loginForm.value)
      .catch(error => {
        this.error = error;
      });
    // console.log(this.mapService.address.place_name)
    // console.log(this.mapService.address.geometry)
  }

}
