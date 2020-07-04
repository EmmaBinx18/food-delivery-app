import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cart } from '../models/cart.model';
import { AuthService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  insertOrder(cart: Cart[]) {
    return this.http.post(`api/orders`, { params: this.mappOrderObject(cart) }).toPromise();
  }

  mappOrderObject(cart: Cart[]) {
    const order = {
      customerId: this.authService.getCurrentUser().uid,
      addressId: '',
      orderDateTime: Date.now(),
      products: []
    }

    cart.forEach(item => {
      order.products.push({ productId: item.product.id, quantity: item.quantity });
    });

    return order;
  }

  getOrdersForBusiness(businessId: string) {
    return this.http.get(`api/orders/${businessId}`).toPromise();
  }

  getProductsForOrder(orderId: number) {
    return [
      {
        prderId: 0,
        productId: 0,
        quantity: 3,
        orderProductStatusId: 2,
        productPrice: 20,
        orderItemsStarted: '',

      }
    ]
  }
}
