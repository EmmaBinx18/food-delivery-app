import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  registerDeliveryDriver(uid: string) {
    return this.http.post(`api/delivery/register`, { params: uid }).toPromise();
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
