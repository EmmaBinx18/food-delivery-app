import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { AddressService } from 'src/app/core/services/address.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  @Input() business: any;
  @Input() category: string

  @Output() backEmitter = new EventEmitter();
  @Output() openSnackbarEmitter = new EventEmitter<{ message: string, class: string }>();

  address: any = '';
  operational: any = '';
  products: any = [];
  error: boolean = false;

  constructor(
    private homeChefService: HomeChefService,
    private addressService: AddressService,
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.error = false;
    this.getOperationalStatus();
    this.getAddress();
    this.getProducts();
  }

  getOperationalStatus() {
    this.homeChefService.getOperationalStatusById(this.business.operationalStatusId)
      .then(response => {
        this.operational = response[0].name;
      })
      .catch(() => {
        this.handleError();
      });
  }

  getAddress() {
    this.addressService.getAddressById(this.business.addressId)
      .then(response => {
        this.address = `${response[0].suburb} ${response[0].city} - ${response[0].zipcode}`
      })
      .catch(() => {
        this.handleError();
      });
  }

  getProducts() {
    //need to filter by availability
    this.productsService.getProductsForABusiness(this.business.businessId)
      .then(response => {
        this.products = response;
      })
      .catch(() => {
        this.handleError();
      });
  }

  back() {
    this.backEmitter.emit();
  }

  handleError() {
    this.error = true;
    this.openSnackbarEmitter.emit({ message: 'Could not load this business. Please try again later.', class: 'snackbar-error' });
  }

  addtoCart(product: any) {
    this.cartService.addToCart(product);
    this.openSnackbarEmitter.emit({ message: `Added ${product.name} to cart`, class: 'snackbar-success' });
  }

}
