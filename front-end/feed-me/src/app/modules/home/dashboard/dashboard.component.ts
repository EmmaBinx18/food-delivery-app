import { Component, OnInit } from "@angular/core";

import { Role } from "src/app/core/models/role.model";

import { AuthService } from "../../../core/authentication/authentication.service";
import { HomeChefService } from "../../../core/services/home-chef.service";
import { DeliveryService } from "../../../core/services/delivery.service";
import { SnackbarService } from "../../../shared/snackbar/snackbar.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  stats: any = [];

  businessName: string = "New Business";
  userName: string = "Emma Coetzer";

  role: Role;

  constructor(
    public authService: AuthService,
    private homeChefService: HomeChefService,
    private deliveryService: DeliveryService,
    public snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.role = this.authService.getCurrentRole();
    // this.userName = this.authService.getCurrentUser().displayName;
    this.stats = this.homeChefService.getStats();
    // if (this.authService.currentRole === Role.HomeChef) {
    //   this.loadHomeChef();
    // }
    // else {
    //   this.loadDelivery();
    // }
  }

  setHomeChefStats() {
    this.stats = this.homeChefService.getStats();
  }

  setDeliveryStats() {
    this.stats = this.deliveryService.getStats();
  }
}
