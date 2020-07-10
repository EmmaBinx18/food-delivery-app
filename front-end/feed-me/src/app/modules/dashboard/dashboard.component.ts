import { Component, OnInit } from "@angular/core";

import { Role } from "src/app/core/models/role.enum";

import { AuthService } from "../../core/authentication/authentication.service";
import { HomeChefService } from "../../core/services/home-chef.service";
import { DeliveryService } from "../../core/services/delivery.service";
import { SnackbarService } from "../../shared/snackbar/snackbar.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  stats: any = [];
  business: any = null;
  userName: string = '';
  businessName: string = '';

  constructor(
    public authService: AuthService,
    private homeChefService: HomeChefService,
    private deliveryService: DeliveryService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.userName = this.authService.getCurrentUser().displayName;
    this.stats = this.homeChefService.getStats();
    if (this.authService.getCurrentRole() === Role.HomeChef) {
      this.getUserBusiness();
    }
  }

  setHomeChefStats() {
    this.stats = this.homeChefService.getStats();
  }

  setDeliveryStats() {
    this.stats = this.deliveryService.getStats();
  }

  getUserBusiness() {
    this.homeChefService.getBusinessByUserId(this.authService.getCurrentUser().uid)
      .then(response => {
        this.business = response;
        this.businessName = response[0].name;
      })
      .catch(() => {
        this.snackbarService.error('Your business could not be loaded. Please try again later.');
      });
  }
}
