import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-delivery-dashboard',
  templateUrl: './delivery-dashboard.component.html',
  styleUrls: ['./delivery-dashboard.component.scss']
})
export class DeliveryDashboardComponent implements OnInit {

  delivery: any = {};
  deliveries: any = [];

  deliveriesError: boolean = false;
  deliveryDisplay: boolean = false;

  constructor(
    private deliveryService: DeliveryService,
    private authService: AuthService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.getDeliveries();
  }

  getDeliveries() {
    this.deliveryService.getDeliveriesForDriver(this.authService.getCurrentUser().uid)
      .then(response => {
        this.deliveriesError = false;
        this.deliveries = response;
      })
      .catch(() => {
        this.deliveriesError = true;
        this.snackbarService.error('Could not load your deliveries. Please try again later.');
      })
  }

}
