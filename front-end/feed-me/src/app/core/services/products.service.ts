import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
