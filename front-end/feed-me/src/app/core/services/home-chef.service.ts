import { Injectable } from '@angular/core';
import { Business } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class HomeChefService {

  constructor() { }

  registerBusiness(business: Business) {

  }

  getCategories() {

  }

  getProvinces() {
    return ['Western Cape', 'EasternCape', 'NorthernCape', 'NorthWest', 'FreeState', 'Kwazulu Natal', 'Gauteng', 'Limpopo', 'Mpumlanga']
  }
}
