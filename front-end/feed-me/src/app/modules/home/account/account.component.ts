import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/core/authentication/authentication.service";
import { SnackbarService } from "src/app/shared/snackbar/snackbar.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  orders: any = [];
  profile: any = [];

  display = {
    orders: true,
    profile: false,
    addresses: false,
  };

  constructor(
    private authService: AuthService,
    public snackbarService: SnackbarService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.userService
      .getUser(this.authService.getCurrentUser().uid)
      .then((response) => {
        this.profile = response[0];
      })
      .catch(() => {
        this.snackbarService.show({
          message:
            "There was an error loading this page. Please try again later.",
          class: "error",
        });
      });
  }

  getOrderHistory() { }

  setAllFalse() {
    Object.keys(this.display).forEach((key) => {
      this.display[key] = false;
    });
  }

  changeDisplay(option: string) {
    this.setAllFalse();
    this.display[option] = true;
  }

  logout() {
    this.authService.logout();
  }
}
