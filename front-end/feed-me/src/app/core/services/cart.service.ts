import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[] = [];

  constructor() { }

  addToCart(product: Product) {
    this.cart.forEach(item => {
      if (item.product == product) {
        item.quantity += 1;
        return;
      }
    });
    this.cart.push({ product, quantity: 1 });
  }

  removeFromCart(product: Product) {
    this.cart.forEach(item => {
      if (item.product == product) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
        else {
          const index = this.cart.indexOf(item);
          this.cart.splice(index, 1);
        }
      }
    });
  }
}
