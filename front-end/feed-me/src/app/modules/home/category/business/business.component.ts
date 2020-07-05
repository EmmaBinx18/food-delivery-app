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
  @Input() category: string;

  @Output() backEmitter = new EventEmitter();

  address: any = '';
  operational: any = '';
  products: any = [];
  error: boolean = false;

  constructor(
    private homeChefService: HomeChefService,
    private addressService: AddressService,
    private productsService: ProductsService,
    private cartService: CartService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.error = false;
    Promise.all([
      this.homeChefService.getOperationalStatusById(this.business.operationalStatusId),
      this.addressService.getAddressById(this.business.addressId),
      this.productsService.getProductsForABusiness(this.business.businessId)
    ])
      .then(response => {
        this.operational = response[0][0].name;
        this.address = response[1][0].address;
        this.products = response[2];
      })
      .catch(() => {
        this.error = true;
        this.snackbarService.show({ message: 'Could not load this business. Please try again later.', class: 'snackbar-error' });
      });
  }

  back() {
    this.backEmitter.emit();
  }

  addtoCart(product: any) {
    if (this.operational != 'Closed') {
      this.cartService.addToCart(product);
      this.snackbarService.show({ message: `Added ${product.name} to cart`, class: 'snackbar-success' });
    }
  }

}
