import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Address } from "../models/address.model";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class AddressService {
  constructor(private http: HttpClient) { }

  getAddressById(addressId: string) {
    return this.http.get(`${environment.api}/address/${addressId}`).toPromise();
  }

  getUserAddresses(userId: string) {
    return this.http.get(`${environment.api}/address/user/${userId}`).toPromise();
  }

  insertAddress(address: Address) {
    return this.http.post(`${environment.api}/address`, { params: { ...address } }).toPromise();
  }

  updateAddress(address: Address) {
    return this.http.patch(`${environment.api}/address`, { params: { ...address } }).toPromise();
  }

  removeUserAddress(userId: string, addressId: string) {
    return this.http.post(`${environment.api}/address/user/${userId}`, { params: addressId }).toPromise();
  }
}
