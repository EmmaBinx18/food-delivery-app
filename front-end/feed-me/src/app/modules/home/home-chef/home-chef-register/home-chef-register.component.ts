import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { HomeChefService } from 'src/app/core/services/home-chef.service';

@Component({
  selector: 'app-home-chef-register',
  templateUrl: './home-chef-register.component.html',
  styleUrls: ['./home-chef-register.component.scss']
})
export class HomeChefRegisterComponent implements OnInit {

  registerForm: FormGroup;
  uid: string;
  categories: string[] = [];
  provinces: string[] = [];

  @Output() closeFormEmitter = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private homeChefService: HomeChefService
  ) { }

  ngOnInit() {
    this.uid = this.authService.currentUser.uid;
    this.provinces = this.homeChefService.getProvinces();
    // this.categories = this.homeChefService.getCategories();
    this.registerForm = this.initForm();
  }

  initForm() {
    return this.formBuilder.group({
      uid: [this.uid],
      businessName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      street: ['', [Validators.required]],
      complex: [''],
      suburb: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      country: ['South Africa']
    });
  }

  setCategory(event: any) {
    this.registerForm.get('category').setValue(event.target.value, { onlySelf: true });
  }

  setProvince(event: any) {
    this.registerForm.get('province').setValue(event.target.value, { onlySelf: true });
  }

  register() {
    if (this.registerForm.valid) {
      this.homeChefService.registerBusiness(this.registerForm.value);
    }
  }

  closeForm() {
    this.closeFormEmitter.emit();
  }

}
