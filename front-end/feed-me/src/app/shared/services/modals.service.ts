import { Injectable } from '@angular/core';

import { HomeChefRegisterComponent } from '../../modules/home/home-chef-register/home-chef-register.component';
import { DeliveryRegisterComponent } from '../../modules/home/delivery-register/delivery-register.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  components = {
    homeChef: HomeChefRegisterComponent,
    driver: DeliveryRegisterComponent
  }

  constructor() { }

  open(option: string) {
    return this.components[option];
  }
}
