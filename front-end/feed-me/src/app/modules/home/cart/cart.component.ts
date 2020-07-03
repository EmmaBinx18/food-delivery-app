import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart[] = [];

  @Output() openSnackbarEmitter = new EventEmitter<{ message: string, class: string }>();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.cart = this.cartService.cart;
  }

  removeCartItem(item: Cart) {
    this.cartService.removeFromCart(item.product);
    this.openSnackbarEmitter.emit({ message: 'Removed item from cart', class: 'snackbar-success' });
  }

}
