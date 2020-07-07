import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Cart } from "src/app/core/models/cart.model";
import { CartService } from "src/app/core/services/cart.service";
import { OrdersService } from 'src/app/core/services/orders.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  @Input() orders: any;
  @Input() addresses: any;

  currentOrder: Cart[] = [];
  subtotal: number = 0;
  itemsTotal: number = 0;

  @Output() changeDisplayEmitter = new EventEmitter();

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.currentOrder = this.cartService.cart;
    this.getSubTotal();
    this.getItemsTotal();
  }

  getSubTotal() {
    this.currentOrder.forEach((item) => {
      this.subtotal += item.product.price * item.quantity;
    });
  }

  getItemsTotal() {
    this.currentOrder.forEach((item) => {
      this.itemsTotal += item.quantity;
    });
  }

  removeCartItem(item: Cart) {
    this.cartService.removeFromCart(item);
  }

  addAddress() {
    this.changeDisplayEmitter.emit();
  }

  checkout() {
    // this.orderService.insertOrder(this.cartService.cart, this.addresses[0].addressId)
    //   .then(() => {
    //     this.cartService.clearCart();
    //     this.snackbarService.show({ message: 'Your order has been created and should be on its way shortly', class: 'success' });
    //   })
    //   .catch(() => {
    //     this.snackbarService.show({ message: 'Your order could not be submitted. Please try again later.', class: 'error' });
    //   });
  }
}
