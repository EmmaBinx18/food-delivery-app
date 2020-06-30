import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Business } from '../models/business.model';
import { UserService } from './user.service';
import { ProductsService } from './products.service';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class HomeChefService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private productsService: ProductsService,
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
        console.log(response);
        // return this.http.post(`api/business`, { params: 
        //   { name: business.businessName, categoryId: business.category, addressId: '', userId: business.uid } 
        // }).toPromise();
      })
      .catch(() => {
        throw ('Could not register business. Please try again later');
      });
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

  getBusinessesFiltered(categoryId: string) {
    return this.getBusinessesByCategory(categoryId)
      .then(businesses => {
        let filtered = [];
        Object.keys(businesses).forEach(business => {
          let obj = { name: '', user: '', products: [] };
          obj.name = business['name'];
          this.userService.getUser(business['userId'])
            .then(user => {
              obj.user = user['firstname'] + ' ' + user['lastname'];
            });
          this.productsService.getAllProducts()
            .then(products => {

            });
        });
      })
      .catch(() => {
        throw new Error();
      });
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
