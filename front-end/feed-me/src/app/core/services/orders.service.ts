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
    return this.http.post(`api/orders`, { params: this.mapOrderObject(cart) }).toPromise();
  }

  mapOrderObject(cart: Cart[]) {
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

  getActiveOrderReadyProducts(orderId: string) {
    return this.http.post(`api/orders/activeOrderReadyProducts`, { params: orderId }).toPromise();
  }

  mapOrderReadyProduct(location: any) {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: location.coordinates
      },
      properties: {
        title: location.businessName,
        description: ''
      }
    }
  }
}
