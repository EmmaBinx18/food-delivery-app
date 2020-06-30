import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  insertAddress(address: Address) {
    return this.http.post(`api/address`, { params: { ...address } }).toPromise();
  }

  updateAddress(address: Address) {
    return this.http.patch(`api/address`, { params: { ...address } }).toPromise();
  }

  getProvinces() {
    return ['Western Cape', 'EasternCape', 'NorthernCape', 'NorthWest', 'FreeState', 'Kwazulu Natal', 'Gauteng', 'Limpopo', 'Mpumlanga']
  }
}
