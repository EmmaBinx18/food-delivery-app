import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { MapboxService } from 'src/app/core/services/mapbox.service';

@Component({
  selector: 'app-delivery-register',
  templateUrl: './delivery-register.component.html',
  styleUrls: ['./delivery-register.component.scss']
})
export class DeliveryRegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private deliveryService: DeliveryService,
    public modalService: ModalService,
    public snackbarService: SnackbarService,
    private mapService: MapboxService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      uid: [this.authService.getCurrentUser().uid],
      address: [""]
    });
  }

  setAddress() {
    const address = {
      addressId: -1,
      address: this.mapService.address.place_name,
      geometry: this.mapService.address.geometry,
      userId: null
    };

    this.registerForm.get("address").setValue(address);
  }

  register() {
    this.setAddress();
    if (this.registerForm.valid) {
      this.deliveryService.registerDeliveryDriver(this.registerForm.value)
        .then(() => {
          this.snackbarService.show({ message: 'Successfully sent registration request', class: 'success' });
          this.modalService.close();
        })
        .catch(() => {
          this.snackbarService.show({ message: 'Could not submit your request. Please try again later', class: 'error' });
        });
    }
  }

}
