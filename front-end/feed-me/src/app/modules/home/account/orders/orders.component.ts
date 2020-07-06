import { Component, OnInit, Input } from '@angular/core';

import { Cart } from 'src/app/core/models/cart.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @Input() orders: any;
  currentOrder: Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.currentOrder = this.cartService.cart;
  }

  removeCartItem(item: Cart) {
    this.cartService.removeFromCart(item);
  }

}
