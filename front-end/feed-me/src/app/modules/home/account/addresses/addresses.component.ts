import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { MapboxService } from 'src/app/core/services/mapbox.service';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { AddressService } from 'src/app/core/services/address.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { Address } from '../../../../core/models/address.model';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  @Input() addresses: any = [];

  constructor(
    public mapService: MapboxService,
    private authService: AuthService,
    private addressService: AddressService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses() {
    this.addressService
      .getUserAddresses(this.authService.getCurrentUser().uid)
      .then(response => {
        this.addresses = response[0].locations;
      })
      .catch(() => {
        this.snackbarService.show({ message: 'Could not load your addresses. Please try again later', class: 'error' })
      });
  }

  addAddress() {
    const address = {
      addressId: -1,
      address: this.mapService.address.place_name,
      geometry: this.mapService.address.geometry,
      userId: this.authService.getCurrentUser().uid
    };

    this.addressService.insertAddress(address)
      .then(() => {
        this.snackbarService.show({ message: 'Successfully added address to profile', class: 'success' });
        this.getAddresses();
      })
      .catch(() => {
        this.snackbarService.show({ message: 'Could not add address to your profile. Please try again later', class: 'error' })
      });
  }

  removeAddress(address: Address) {

  }

}
