import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cart: boolean = false;

  constructor(
    public router: Router,
    private cartService: CartService
  ) { }

  closeCart() {
    this.cart = false;
  }

  openCart() {
    if (window.innerWidth <= 800) {
      this.router.navigate(['/account']);
    } else {
      this.cart = true;
      if (this.cartService.cart.length == 0) {
        setTimeout(() => this.cart = false, 3000);
      }
    }
  }
}
