import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

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
export class AddressesComponent implements OnChanges {

  @Input() addresses: any = [];
  @Input() error: boolean;

  loading: boolean = true;

  constructor(
    public mapService: MapboxService,
    private authService: AuthService,
    private addressService: AddressService,
    private snackbarService: SnackbarService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.addresses.currentValue.length != 0) {
      this.loading = false;
    }
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
        this.snackbarService.success('Successfully added address to profile');
        this.addresses.push(address);

      })
      .catch(() => {
        this.snackbarService.error('Could not add address to your profile. Please try again later')
      });
  }

  removeAddress(address: Address) {
    this.addressService.removeUserAddress(this.authService.getCurrentUser().uid, address.addressId.toString())
      .then(() => {
        this.snackbarService.success('Successfully removed address from profile');
        this.updateAddresses(address);
      })
      .catch(() => {
        this.snackbarService.error('Could not remove address from your profile. Please try again later.');
      });
  }

  updateAddresses(address: Address) {
    const index = this.addresses.indexOf(address);
    this.addresses.splice(index, 1);
  }

}
