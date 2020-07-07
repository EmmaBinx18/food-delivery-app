import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAddressById(addressId: string) {
    return this.http.get(`api/address/${addressId}`).toPromise();
  }

  getUserAddresses(userId: string) {
    return this.http.post('api/address/user', { params: userId }).toPromise();
  }

  insertAddress(address: Address) {
    return this.http.post(`api/address`, { params: { ...address } }).toPromise();
  }

  updateAddress(address: Address) {
    return this.http.patch(`api/address`, { params: { ...address } }).toPromise();
  }
}
