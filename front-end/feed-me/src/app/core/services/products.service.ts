import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(`api/products`).toPromise();
  }

  getProductsForABusiness(businessId: string) {
    return this.http.get(`api/products/${businessId}`).toPromise();
  }

  insertProduct(product: Product) {
    return this.http.post('api/products', { params: this.mapProduct(product) }).toPromise();
  }

  mapProduct(product: Product) {
    return {
      productId: -1,
      name: product.name,
      description: product.description,
      businessId: product.businessId,
      availabilityStatusId: 1,
      price: product.price,
      minPrepareTime: product.minPrepareTime
    }
  }
}
