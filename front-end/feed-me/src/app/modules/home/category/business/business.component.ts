import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { AddressService } from 'src/app/core/services/address.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { CartService } from 'src/app/core/services/cart.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  @Input() business: any;
  @Output() backEmitter = new EventEmitter();

  address: any = '';
  operational: any = '';
  products: any = [];
  error: boolean = false;
  loading: boolean = true;

  constructor(
    private homeChefService: HomeChefService,
    private addressService: AddressService,
    private productsService: ProductsService,
    private cartService: CartService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.error = false;
    this.loading = true;
    Promise.all([
      this.homeChefService.getOperationalStatusById(this.business.operationalStatusId),
      this.addressService.getAddressById(this.business.addressId),
      this.productsService.getProductsForABusiness(this.business.businessId)
    ])
      .then(response => {
        this.operational = response[0][0].name;
        this.address = response[1][0].address;
        this.products = response[2];
        this.loading = false;
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
        this.snackbarService.error('Could not load this business. Please try again later.');
      });
  }

  back() {
    this.backEmitter.emit();
  }

  addtoCart(product: any) {
    this.cartService.addToCart(product);
    this.snackbarService.success(`Added ${product.name} to cart`);
  }

}
