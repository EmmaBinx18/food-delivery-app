import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Business } from '../models/business.model';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class HomeChefService {

  constructor(
    private http: HttpClient,
    private addressService: AddressService
  ) { }

  registerBusiness(business: Business) {
    const address = {
      street: business.street,
      complex: business.complex,
      suburb: business.suburb,
      zipcode: business.zipcode,
      city: business.city,
      province: business.province,
      country: business.country
    }

    return this.addressService.insertAddress(address)
      .then(response => {
        return this.insertBusiness(business, response[0].addressId);
      })
      .catch(error => {
        throw (error);
      });
  }

  insertBusiness(business: any, addressId: string) {
    return this.http.post(`api/business`, {
      params:
        { name: business.businessName, categoryId: business.category, addressId, userId: business.uid }
    }).toPromise();
  }

  getAllOperationalStatuses() {
    return this.http.get(`api/business/operationalStatus`).toPromise();
  }

  getOperationalStatusById(operationId: string) {
    return this.http.post(`api/business/operationalStatus`, { params: operationId }).toPromise();
  }

  getBusinessMeals() {
    return [
      {
        name: 'Meal 1',
        description: 'Description for meal 1',
        availabilityStatusId: 1,
        price: 200,
        minPrepareTime: 90
      },
      {
        name: 'Meal 2',
        description: 'Description for meal 2',
        availabilityStatusId: 1,
        price: 120,
        minPrepareTime: 30
      },
      {
        name: 'Meal 3',
        description: 'Description for meal 3',
        availabilityStatusId: 0,
        price: 400,
        minPrepareTime: 120
      }
    ]
  }

  getAllBusinesses() {
    return this.http.get(`api/business`).toPromise();
  }

  getBusinessById(businessId: string) {
    return this.http.get(`api/business/${businessId}`).toPromise();
  }

  getBusinessesByCategory(categoryId: string) {
    return this.http.post(`api/business/category`, { params: categoryId }).toPromise();
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
