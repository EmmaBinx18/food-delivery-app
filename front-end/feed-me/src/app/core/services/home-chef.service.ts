import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Business } from '../models/business.model';
import { AddressService } from './address.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeChefService {

  constructor(
    private http: HttpClient,
    private addressService: AddressService
  ) { }

  registerBusiness(business: Business) {
    return this.addressService.insertAddress(business.address)
      .then(response => {
        return this.insertBusiness(business, response[0].addressId);
      })
      .catch(error => {
        throw (error);
      });
  }

  insertBusiness(business: any, addressId: string) {
    return this.http.post(`${environment.api}/business`, {
      params:
        { businessId: -1, name: business.businessName, categoryId: business.category, addressId: addressId, userId: business.uid }
    }).toPromise();
  }

  getAllOperationalStatuses() {
    return this.http.get(`${environment.api}/business/operationalStatus`).toPromise();
  }

  getOperationalStatusById(operationalStatusId: string) {
    return this.http.get(`${environment.api}/business/operationalStatus/${operationalStatusId}`).toPromise();
  }

  getAllBusinesses() {
    return this.http.get(`${environment.api}/business`).toPromise();
  }

  getBusinessById(businessId: string) {
    return this.http.get(`${environment.api}/business/${businessId}`).toPromise();
  }

  getBusinessByUserId(userId: string) {
    return this.http.get(`${environment.api}/business/user/${userId}`).toPromise();
  }

  getBusinessesByCategory(categoryId: string) {
    return this.http.get(`${environment.api}/business/category/${categoryId}`).toPromise();
  }

  getStats() {
    return [
      {
        description: 'Total no. orders this month',
        stat: '20'
      },
      {
        description: 'Total no. of meals',
        stat: '20'
      },
      {
        description: 'Total income this month',
        stat: 'R1000.00'
      }
    ];
  }
}
