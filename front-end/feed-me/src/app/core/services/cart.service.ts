import { Injectable, OnInit } from '@angular/core';

import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  cart: CartItem[] = [];

  constructor() { }

  ngOnInit() {
    const storage = localStorage.getItem('cart');
    if (storage) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    else {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  addToCart(product: Product) {
    const index = this.cart.findIndex(item => item.product == product);
    if (index > -1) {
      this.cart[index].quantity += 1;
    }
    else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  removeFromCart(item: CartItem) {
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
