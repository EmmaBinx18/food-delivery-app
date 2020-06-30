import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AddressService } from 'src/app/core/services/address.service';

@Component({
  selector: 'app-home-chef-register',
  templateUrl: './home-chef-register.component.html',
  styleUrls: ['./home-chef-register.component.scss']
})
export class HomeChefRegisterComponent implements OnInit {

  registerForm: FormGroup;
  uid: string;
  categories: any;
  provinces: string[] = [];

  @Output() closeFormEmitter = new EventEmitter();
  @Output() openSnackbarEmitter = new EventEmitter<{ message: string, class: string }>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private homeChefService: HomeChefService,
    private categoryService: CategoriesService,
    public snackbar: SnackbarService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.uid = this.authService.getCurrentUser().uid;
    this.setSelectOptions();
    this.initForm();
  }

  setSelectOptions() {
    this.provinces = this.addressService.getProvinces();
    this.categoryService.getAllCategories()
      .then(response => {
        this.categories = response;
      })
      .catch(() => {
        this.openSnackbarEmitter.emit({ message: 'Could not load categories. Please try again later', class: 'snackbar-error' });
      });
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
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
      this.homeChefService.registerBusiness(this.registerForm.value)
        .then(() => {
          this.openSnackbarEmitter.emit({ message: 'Successfully sent business registration request.', class: 'snackbar-success' });
          this.closeForm();
        })
        .catch(error => {
          console.log(error);
          // this.openSnackbarEmitter.emit({ message: 'Could not load categories. Please try again later', class: 'snackbar-error' });
        });
    }
  }

  closeForm() {
    this.closeFormEmitter.emit();
  }

}
