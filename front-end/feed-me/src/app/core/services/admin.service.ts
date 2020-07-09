import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) { }

  approveAllBusinesses() {
    return this.http.post(`api/admin/approveallbusinesses`,{params: {}}).toPromise();
  }

  approveBusiness(businessId: string) {
    return this.http.post(`api/admin/approvebusiness`,{params: {businessId}}).toPromise();
  }

  disapproveBusiness(businessId: string) {
    return this.http.post(`api/admin/disapprovebusiness`,{params: { businessId}}).toPromise();
  }

  removeUserRole (userId : string)
  {
    return this.http.post(`api/admin/removeuserrole`,{params: { userId}}).toPromise();
  }

  getUserRoles ()
  {
    return this.http.get(`api/admin/userroles/`).toPromise();
  }

  getCustomers ()
  {
    return this.http.get(`api/admin/customers/`).toPromise();
  }

  addDriverRole (userId : string, businessId : string)
  {
    return this.http.post(`api/admin/addbusinessrole`,{params: {userId, businessId}}).toPromise();
  }

  closeBusiness(businessId: string) {
    console.log(businessId)
    return this.http.post(`api/admin/closebusiness`,{params: { businessId:businessId} }).toPromise();
  }

  openBusiness(businessId: string){
    return this.http.post(`api/admin/openbusiness`,{params: { businessId} }).toPromise();
  }
  //closebusiness
}


