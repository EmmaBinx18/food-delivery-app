import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { AddressService } from 'src/app/core/services/address.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  @Input() business: any;
  @Input() category: string

  @Output() backEmitter = new EventEmitter();
  @Output() openSnackbarEmitter = new EventEmitter<{ message: string, class: string }>();

  address: any = '';
  operational: any = '';

  constructor(
    private homeChefService: HomeChefService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.getOperationalStatus();
    this.getAddress();
  }

  getOperationalStatus() {
    this.homeChefService.getOperationalStatusById(this.business.operationalStatusId)
      .then(response => {
        this.operational = response[0].name;
      })
      .catch(() => {
        this.openSnackbarEmitter.emit({ message: 'Could not load this business. Please try again later.', class: 'snackbar-error' });
      });
  }

  getAddress() {
    this.addressService.getAddressById(this.business.addressId)
      .then(response => {
        this.address = `${response[0].suburb} ${response[0].city} - ${response[0].zipcode}`
      })
      .catch(() => {
        this.openSnackbarEmitter.emit({ message: 'Could not load this business. Please try again later.', class: 'snackbar-error' });
      });
  }

  back() {
    this.backEmitter.emit();
  }

}
