import { Component, Output, EventEmitter } from '@angular/core';

import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/models/cart.model';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @Output() closeCartEmitter = new EventEmitter();

  constructor(
    public cartService: CartService,
    public snackbarService: SnackbarService,
    public router: Router
  ) { }

  removeCartItem(item: Cart) {
    this.cartService.removeFromCart(item);
    this.snackbarService.success(`Removed ${item.product.name} from cart`);
  }

  closeCart() {
    this.closeCartEmitter.emit();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    this.closeCartEmitter.emit();
    this.router.navigate(['/account']);
  }

}
