import { Component, OnInit } from '@angular/core';

import { NavService } from 'src/app/shared/services/nav.service';
import { Role } from 'src/app/core/models/role.model';

import { AuthService } from '../../../core/authentication/authentication.service';
import { HomeChefService } from '../../../core/services/home-chef.service';
import { DeliveryService } from '../../../core/services/delivery.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: any = [];
  products: any = [];

  businessName: string = "New Business";
  userName: string = "Emma Coetzer";

  role: Role;

  addMealModal: boolean = false;

  constructor(
    public authService: AuthService,
    public navService: NavService,
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

  loadHomeChef() {
    // this.homeChefService.getBusiness(this.authService.getCurrentUser().uid)
    //   .then(response => {
    //     this.businessName = response['name'];
    //     this.setHomeChefStats();
    //   })
    //   .catch(() => {
    //     this.snackbar.open('Your business would not be loaded. Please try again later.');
    //   });
  }

  loadDelivery() {
    this.setDeliveryStats();
  }

  setHomeChefStats() {
    this.stats = this.homeChefService.getStats();
  }

  setDeliveryStats() {
    this.stats = this.deliveryService.getStats();
  }

  openModal(option: string) {
    if (option === 'meal') {
      this.addMealModal = true;
    }
  }

  closeModal(option: string) {
    if (option === 'meal') {
      this.addMealModal = false;
    }
  }

}
