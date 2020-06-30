import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import { AddressService } from 'src/app/core/services/address.service';

@Component({
  selector: 'app-delivery-register',
  templateUrl: './delivery-register.component.html',
  styleUrls: ['./delivery-register.component.scss']
})
export class DeliveryRegisterComponent implements OnInit {

  registerForm: FormGroup;
  uid: string;
  provinces: string[] = [];

  @Output() closeFormEmitter = new EventEmitter();
  @Output() openSnackbarEmitter = new EventEmitter<{ message: string, class: string }>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private deliveryService: DeliveryService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.uid = this.authService.getCurrentUser().uid;
    this.provinces = this.addressService.getProvinces();
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      uid: [this.uid],
      street: ['', [Validators.required]],
      complex: [''],
      suburb: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      country: ['South Africa']
    });
  }

  closeForm() {
    this.closeFormEmitter.emit();
  }

  register() {
    if (this.registerForm.valid) {
      this.deliveryService.registerDeliveryDriver(this.registerForm.value)
        .then(() => {
          this.openSnackbarEmitter.emit({ message: 'Successfully sent registration request.', class: 'snackbar-success' });
          this.closeForm();
        })
        .catch(() => {
          this.openSnackbarEmitter.emit({ message: 'Could not submit your request. Please try again later.', class: 'snackbar-error' });
        });
    }
  }

}
