import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  getOrdersForBusiness(businessId: number) {
    return [
      {
        id: 0,
        orderDateTime: '',
        orderPlaceddateTime: '',
        orderStatusId: 0,
        deliveryId: 0
      }
    ]
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
