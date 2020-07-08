import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  formatDate(items: any) {
    items.forEach(item => {
      const date = new Date(item.orderDateTime);
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      item.orderDateTime = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    });
  }
}
