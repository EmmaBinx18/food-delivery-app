import { Component, Output, EventEmitter } from '@angular/core';

import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/models/cart.model';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @Output() closeCartEmitter = new EventEmitter();
  @Output() checkoutEmitter = new EventEmitter();

  constructor(
    public cartService: CartService,
    public snackbarService: SnackbarService
  ) { }

  removeCartItem(item: Cart) {
    this.cartService.removeFromCart(item);
    this.snackbarService.show({ message: `Removed ${item.product.name} from cart`, class: 'success' });
  }

  closeCart() {
    this.closeCartEmitter.emit();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    this.checkoutEmitter.emit();
    this.closeCartEmitter.emit();
  }

}
