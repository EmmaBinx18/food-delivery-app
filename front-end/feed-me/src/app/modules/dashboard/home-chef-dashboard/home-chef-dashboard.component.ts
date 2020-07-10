import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ProductsService } from 'src/app/core/services/products.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-home-chef-dashboard',
  templateUrl: './home-chef-dashboard.component.html',
  styleUrls: ['./home-chef-dashboard.component.scss']
})
export class HomeChefDashboardComponent implements OnChanges {

  @Input() business: any;

  products: any = null;
  orders: any = null;

  productsError: boolean = false;
  ordersError: boolean = false;

  constructor(
    private productsService: ProductsService,
    public snackbarService: SnackbarService,
    private ordersService: OrdersService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.business.currentValue.length != 0) {
      this.getProducts(this.business[0].businessId);
      this.getOrders(this.business[0].businessId);
    }
  }

  getProducts(businessId: string) {
    this.productsService.getProductsForABusiness(businessId)
      .then(response => {
        this.products = response;
        this.productsError = false;
      })
      .catch(() => {
        this.productsError = true;
        this.handleError();
      });
  }

  getOrders(businessId: string) {
    this.ordersService.getOrdersForBusiness(businessId)
      .then(response => {
        this.orders = response;
        this.ordersError = false;
      })
      .catch(() => {
        this.ordersError = true;
        this.handleError();
      });
  }

  handleError() {
    this.snackbarService.error('Could not load your business. Please try again later.');
  }
}
