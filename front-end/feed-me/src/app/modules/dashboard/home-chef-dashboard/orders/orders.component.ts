import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { OrdersService } from 'src/app/core/services/orders.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnChanges {

  @Input() orders: any;
  @Input() error: boolean;

  loading: boolean = true;

  constructor(
    private ordersService: OrdersService,
    public snackbarService: SnackbarService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.orders.currentValue.length != 0) {
      this.loading = false;
      console.log(this.orders);
    }
  }

  completeOrder(order: any) {
    this.ordersService.postCompleteOrder(order)
      .then(() => {
        this.snackbarService.success('Successfully completed order');
        this.updateOrders(order);
      })
      .catch(() => {
        this.snackbarService.error('Could not complete order. Please try again.');
      })
  }

  updateOrders(order: any) {
    const index = this.orders.indexOf(order);
    this.orders.splice(index, 1);
  }
}
