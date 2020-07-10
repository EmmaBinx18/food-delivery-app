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
  orders: any = null;
  profile: any = null;
  addresses: any = null;

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
    this.refresh();
  }

  refresh() {
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
        this.snackbarService.error('Could not load your profile information. Please try again later.');
      });
  }

  getAddresses() {
    this.addressService.getUserAddresses(this.authService.getCurrentUser().uid)
      .then(response => {
        if (response[0].results) {
          this.addresses = [];
        }
        else {
          this.addresses = response[0].locations;
        }
        this.addressesError = false;
      })
      .catch(() => {
        this.addressesError = true;
        this.snackbarService.error('Could not load your address information. Please try again later.');
      });
  }

  getOrderHistory() {
    this.ordersService.getUserOrderHistory(this.authService.getCurrentUser().uid)
      .then(response => {
        if (response[0].results) {
          this.orders = [];
        }
        else {
          this.orders = response;
        }
        this.ordersError = false;
      })
      .catch(() => {
        this.ordersError = true;
        this.snackbarService.error('Could not load your order history. Please try again later.');
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
    this.refresh();
  }
}
