import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { NgStyle } from '@angular/common';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-home-chef-dashboard',
  templateUrl: './home-chef-dashboard.component.html',
  styleUrls: ['./home-chef-dashboard.component.scss']
})
export class HomeChefDashboardComponent implements OnInit {

  business: NgStyle;
  products: any = [];
  orders: any = [];
  loading: boolean = true;

  constructor(
    private productsService: ProductsService,
    private homeChefService: HomeChefService,
    private authService: AuthService,
    public snackbarService: SnackbarService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getBusiness();
  }

  getBusiness() {
    // this.homeChefService.getBusinessByUserId(this.authService.getCurrentUser().uid)
    this.homeChefService.getBusinessByUserId('2')
      .then(response => {
        console.log(response);
        this.getProducts('1');
        this.getOrders('1');
      })
      .catch(() => {
        this.handleError();
      });
  }

  getProducts(businessId: string) {
    this.productsService.getProductsForABusiness(businessId)
      .then(response => {
        this.products = response;
      })
      .catch(() => {
        this.handleError();
      });
  }

  getOrders(businessId: string) {
    this.ordersService.getOrdersForBusiness(businessId)
      .then(response => {
        this.orders = response;
        console.log('HERE');
        this.loading = false;
      })
      .catch(() => {
        this.handleError();
      });
  }

  handleError() {
    this.snackbarService.show({ message: 'We could not load your business. Please try again later', class: 'snackbar-error' });
  }
}
