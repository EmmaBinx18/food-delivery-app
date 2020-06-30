import { Injectable } from '@angular/core';

import { Meal } from '../models/meal.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartItem[] = [];

  constructor() { }

  addToCart(meal: Meal) {
    this.cart.forEach(item => {
      if (item.meal == meal) {
        item.quantity += 1;
        return;
      }
    });
    this.cart.push({ meal, quantity: 1 });
  }

  removeFromCart(mealId: number) {
    this.cart.forEach(item => {
      if (item.meal.id == mealId) {
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
