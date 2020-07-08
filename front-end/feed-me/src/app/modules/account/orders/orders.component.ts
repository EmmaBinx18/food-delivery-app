import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";

import { CartItem } from "src/app/core/models/cart-item.model";
import { CartService } from "src/app/core/services/cart.service";
import { OrdersService } from 'src/app/core/services/orders.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit, OnChanges {
  @Input() orders: any = [];
  @Input() addresses: any = [];
  @Input() error: boolean;

  currentOrder: CartItem[] = [];
  subtotal: number = 0;
  itemsTotal: number = 0;
  loading: boolean = true;

  @Output() changeDisplayEmitter = new EventEmitter();
  @Output() refreshOrderEmitter = new EventEmitter();

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.currentOrder = this.cartService.cart;
    this.getSubTotal();
    this.getItemsTotal();
  }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach(key => {
      if (changes[key].currentValue.length !== 0) {
        this.loading = false;
      }
    });
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

  removeCartItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  addAddress() {
    this.changeDisplayEmitter.emit();
  }

  checkout() {
    this.orderService.insertOrder(this.cartService.cart, this.addresses[0].addressId)
      .then(() => {
        this.cartService.clearCart();
        this.refreshOrderEmitter.emit();
        this.currentOrder = [];
        this.loading = true;
        this.snackbarService.success('Your order has been created and should be on its way shortly');
      })
      .catch(() => {
        this.snackbarService.error('Your order could not be submitted. Please try again later.');
      });
  }
}
