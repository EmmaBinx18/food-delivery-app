import { Component, OnInit, Input } from '@angular/core';

import { ProductsService } from 'src/app/core/services/products.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-home-chef-dashboard',
  templateUrl: './home-chef-dashboard.component.html',
  styleUrls: ['./home-chef-dashboard.component.scss']
})
export class HomeChefDashboardComponent implements OnInit {

  @Input() business: any = [];

  products: any = [];
  orders: any = [];
  loading: boolean = true;

  constructor(
    private productsService: ProductsService,
    public snackbarService: SnackbarService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getProducts('1');
    this.getOrders('1');
  }

  getProducts(businessId: string) {
    this.productsService.getProductsForABusiness(businessId)
      .then(response => {
        this.products = response;
        this.loading = false;
      })
      .catch(() => {
        this.handleError();
      });
  }

  getOrders(businessId: string) {
    this.ordersService.getOrdersForBusiness(businessId)
      .then(response => {
        this.orders = response;
        this.loading = false;
      })
      .catch(() => {
        this.handleError();
      });
  }

  handleError() {
    this.snackbarService.show({ message: 'We could not load your business. Please try again later', class: 'error' });
  }
}
