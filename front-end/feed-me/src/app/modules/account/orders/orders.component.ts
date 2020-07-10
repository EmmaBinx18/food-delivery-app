import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";

import { CartItem } from "src/app/core/models/cart-item.model";
import { CartService } from "src/app/core/services/cart.service";
import { OrdersService } from 'src/app/core/services/orders.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit, OnChanges {
  @Input() orders: any;
  @Input() addresses: any;
  @Input() error: boolean;

  subtotal: number = 0;
  itemsTotal: number = 0;
  loading: boolean = true;
  tracking: boolean = false;
  order: any = null;
  address: string = '';

  @Output() changeDisplayEmitter = new EventEmitter();
  @Output() refreshOrderEmitter = new EventEmitter();

  constructor(
    public cartService: CartService,
    private orderService: OrdersService,
    private commonService: CommonService,
    public snackbarService: SnackbarService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.subtotal = this.getSubTotal(this.cartService.cart);
    this.getItemsTotal();
  }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach(key => {
      if (key == 'orders') {
        if (changes.orders.currentValue !== null) {
          this.loading = false;
          if (changes.orders.currentValue.length !== 0) {
            this.commonService.formatDate(this.orders);
          }
        }
      }
    });
  }

  setAddress(event: any) {
    this.address = event.target.value;
  }

  getSubTotal(order: any) {
    let total = 0;
    order.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }

  getItemsTotal() {
    this.cartService.cart.forEach((item) => {
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
        this.loading = true;
        this.snackbarService.success('Your order has been created and should be on its way shortly');
      })
      .catch(() => {
        this.snackbarService.error('Your order could not be submitted. Please try again later.');
      });
  }

  track(order: any) {
    this.tracking = true;
    this.order = order;
    document.getElementById('tracking').scrollIntoView({ behavior: "smooth" });
  }

  closeTracking() {
    this.tracking = false;
    this.order = null;
  }
}
