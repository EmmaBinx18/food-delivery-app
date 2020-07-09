import { Component, OnInit } from '@angular/core';

import { DeliveryService } from 'src/app/core/services/delivery.service';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-delivery-dashboard',
  templateUrl: './delivery-dashboard.component.html',
  styleUrls: ['./delivery-dashboard.component.scss']
})
export class DeliveryDashboardComponent implements OnInit {

  delivery: any = {};
  order: any = null;
  deliveries: any = null;

  deliveriesError: boolean = false;
  deliveryDisplay: boolean = false;

  constructor(
    private deliveryService: DeliveryService,
    private ordersService: OrdersService,
    private authService: AuthService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.refreshDeliveries();
  }

  refreshDeliveries() {
    this.deliveryDisplay = false;
    this.deliveries = null;
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

  getOrder(orderId: string) {
    this.ordersService.getActiveOrderReadyProducts(orderId)
      .then(response => {
        this.order = response;
      })
      .catch(() => {
        this.snackbarService.error('Could not load your current delivery. Please try again.');
      })
  }

  showDelivery(delivery: any) {
    this.deliveryDisplay = true;
    this.delivery = delivery;
    this.getOrder(delivery.orderId);
  }

}
