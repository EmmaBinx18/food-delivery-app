import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  approveAllBusinesses() {
    return this.http.post(`${environment.api}/admin/approveallbusinesses`, { params: {} }).toPromise();
  }

  approveBusiness(businessId: string) {
    return this.http.post(`${environment.api}/admin/approvebusiness`, { params: { businessId } }).toPromise();
  }

  disapproveBusiness(businessId: string) {
    return this.http.post(`${environment.api}/admin/disapprovebusiness`, { params: { businessId } }).toPromise();
  }

  removeUserRole(userId: string) {
    return this.http.post(`${environment.api}/admin/removeuserrole`, { params: { userId } }).toPromise();
  }

  getUserRoles() {
    return this.http.get(`${environment.api}/admin/userroles`).toPromise();
  }

  getCustomers() {
    return this.http.get(`${environment.api}/admin/customers`).toPromise();
  }

  addBusinessRole(userId: string, businessId: string) {
    return this.http.post(`${environment.api}/admin/addbusinessrole`, { params: { userId, businessId } }).toPromise();
  }

  closeBusiness(businessId: string) {
    return this.http.post(`${environment.api}/admin/closebusiness`, { params: { businessId: businessId } }).toPromise();
  }

  openBusiness(businessId: string) {
    return this.http.post(`${environment.api}/admin/openbusiness`, { params: { businessId } }).toPromise();
  }
}
