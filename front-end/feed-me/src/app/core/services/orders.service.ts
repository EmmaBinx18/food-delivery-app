import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartItem } from '../models/cart-item.model';
import { AuthService } from '../authentication/authentication.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  insertOrder(cart: CartItem[], addressId) {
    return this.http.post(`${environment.api}/orders`, { params: this.mapOrderObject(cart, addressId) }).toPromise();
  }

  mapOrderObject(cart: CartItem[], addressId: string) {
    const order = {
      customerId: this.authService.getCurrentUser().uid,
      addressId: addressId,
      orderDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      products: []
    }

    cart.forEach(item => {
      order.products.push({ productId: item.product.productId, quantity: item.quantity });
    });

    return order;
  }

  getOrdersForBusiness(businessId: string) {
    return this.http.get(`${environment.api}/orders/business/${businessId}`).toPromise();
  }

  getActiveOrderReadyProducts(orderId: string) {
    return this.http.get(`${environment.api}/orders/activeOrderReadyProducts/${orderId}`).toPromise();
  }

  getUserOrderHistory(userId: string) {
    return this.http.get(`${environment.api}/orders/user/${userId}/history`).toPromise();
  }

  postCompleteOrder(order: any) {
    return this.http.post(`${environment.api}/orders/completeOrder`, { params: { productId: order.productId, orderId: order.OrderId } }).toPromise();
  }

  makeOrderPayment(orderId: string, amount: number) {
    return this.http.post(`${environment.api}/orders/pay`, { params: { paymentTypeid: 1, amount, orderId } }).toPromise();
  }

  trackOrder(orderId: any) {
    return this.http.post(`${environment.api}/orders/trackOrder`, { params: orderId }).toPromise();
  }
}
