import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/core/authentication/authentication.service";
import { SnackbarService } from "src/app/shared/snackbar/snackbar.service";
import { UserService } from "src/app/core/services/user.service";
import { AddressService } from 'src/app/core/services/address.service';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  orders: any = [];
  profile: any = [];
  addresses: any = [];

  ordersError: boolean = false;
  profileError: boolean = false;
  addressesError: boolean = false;

  display = {
    orders: true,
    profile: false,
    addresses: false,
  };

  constructor(
    private authService: AuthService,
    public snackbarService: SnackbarService,
    private userService: UserService,
    private addressService: AddressService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.getAddresses();
    this.getOrderHistory();
  }

  getProfile() {
    this.userService.getUser(this.authService.getCurrentUser().uid)
      .then(response => {
        this.profile = response;
        this.profileError = false;
      })
      .catch(() => {
        this.profileError = true;
        this.handleError();
      })
  }

  getAddresses() {
    this.addressService.getUserAddresses(this.authService.getCurrentUser().uid)
      .then(response => {
        this.addresses = response[0].locations;
        this.addressesError = false;
      })
      .catch(() => {
        this.addressesError = true;
        this.handleError();
      })
  }

  getOrderHistory() {
    this.ordersService.getUserOrderHistory(this.authService.getCurrentUser().uid)
      .then(response => {
        this.orders = response;
        this.ordersError = false;
      })
      .catch(() => {
        this.ordersError = true;
        this.handleError();
      })
  }

  setAllFalse() {
    Object.keys(this.display).forEach((key) => {
      this.display[key] = false;
    });
  }

  changeDisplay(option: string) {
    this.setAllFalse();
    this.display[option] = true;
  }

  handleError() {
    this.snackbarService.error('Could not load your profile information. Please try again later.');
  }
}
