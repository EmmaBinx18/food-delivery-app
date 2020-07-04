import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import { AddressService } from 'src/app/core/services/address.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-delivery-register',
  templateUrl: './delivery-register.component.html',
  styleUrls: ['./delivery-register.component.scss']
})
export class DeliveryRegisterComponent implements OnInit {

  registerForm: FormGroup;
  uid: string;
  provinces: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private deliveryService: DeliveryService,
    private addressService: AddressService,
    public modalService: ModalService,
    public snackbarService: SnackbarService
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

  setProvince(event: any) {
    this.registerForm.get('province').setValue(event.target.value, { onlySelf: true });
  }

  register() {
    if (this.registerForm.valid) {
      this.deliveryService.registerDeliveryDriver(this.registerForm.value)
        .then(() => {
          this.snackbarService.show({ message: 'Successfully sent registration request.', class: 'snackbar-success' });
          this.modalService.close();
        })
        .catch(() => {
          this.snackbarService.show({ message: 'Could not submit your request. Please try again later.', class: 'snackbar-error' });
        });
    }
  }

}
