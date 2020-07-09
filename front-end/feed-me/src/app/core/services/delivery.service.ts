import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(
    private http: HttpClient,
    private addressService: AddressService
  ) { }

  registerDeliveryDriver(driver: any) {
    return this.addressService.insertAddress(driver.address)
      .then(response => {
        return this.insertDriver(driver, response[0].addressId);
      })
      .catch(error => {
        throw (error);
      });
  }

  insertDriver(driver: any, addressId: string) {
    return this.http.post(`api/delivery/register`, { params: { userId: driver.uid, addressId: addressId } }).toPromise();
  }

  getDeliveriesForDriver(driverId: string) {
    driverId = 'driver_uid';
    return this.http.get(`api/delivery/${driverId}`).toPromise();
  }

  pickupOrder(businessId: string, orderId: string) {
    return this.http.post(`api/delivery/pickupOrder`, { params: { businessId, orderId } }).toPromise();
  }

  completeDelivery(orderId: string) {
    return this.http.post(`api/delivery/completeDelivery`, { params: { orderId, kmTraveled: 20.582 } }).toPromise();
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

  getStats() {
    return [
      {
        description: 'Total no. trips this month',
        stat: '20'
      },
      {
        description: 'Distance travelled this month',
        stat: '200km'
      },
      {
        description: 'Total income this month',
        stat: 'R1000.00'
      }
    ];
  }
}
