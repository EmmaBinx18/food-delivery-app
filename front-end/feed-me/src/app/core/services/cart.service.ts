import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[] = [];

  constructor() {
    const product = {
      id: 1,
      name: 'product',
      description: '',
      businessId: 2,
      availabilityStatusId: 2,
      price: 200,
      minPrepareTime: 60
    }
    const cp = {
      product,
      quantity: 1
    }
    const cp2 = {
      product,
      quantity: 2
    }
    this.cart.push(cp);
    this.cart.push(cp);
    this.cart.push(cp);
    this.cart.push(cp2);
  }

  addToCart(product: Product) {
    this.cart.forEach(item => {
      if (item.product == product) {
        item.quantity += 1;
        return;
      }
    });
    this.cart.push({ product, quantity: 1 });
  }

  removeFromCart(item: Cart) {
    this.cart.forEach(cartItem => {
      if (cartItem == item) {
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
