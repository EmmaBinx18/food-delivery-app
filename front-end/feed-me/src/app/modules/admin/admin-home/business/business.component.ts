import { Component, OnInit } from '@angular/core';
import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  constructor(private homeChefService : HomeChefService, public snackbarService : SnackbarService, public adminService : AdminService, private userService : UserService) { }

  businesses: any = [];
  loading: boolean = true;
  error: boolean = false;
  operationalStatuses : any = [];
  customers: any = [];

  ngOnInit(): void {
    this.error = false;
    this.loading = true;
    this.businesses = [];
    this.operationalStatuses = [];
    this.customers = [];
    Promise.all([
      this.homeChefService.getAllBusinesses(),
      this.homeChefService.getOperationalStatusById('-1'),
      this.adminService.getCustomers()
     
    ])
      .then(response => {
        this.businesses = response[0];
        this.operationalStatuses = response[1];
        this.customers = response[2];
        this.loading = false;
        this.getStatuses();
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
        this.snackbarService.error('Could not load this business. Please try again later.');
      });
  }

  getStatuses(){
    let combinedBusinesses = []
    for (let i = 0; i < this.businesses.length; i++) {      
      for (let j = 0; j < this.operationalStatuses.length; j++) {
        if (this.businesses[i].operationalStatusId == this.operationalStatuses[j].operationalStatusId) {
          combinedBusinesses.push({ ...this.businesses[i], operationalStatus: this.operationalStatuses[j].name })
        }
      }
    }
    this.businesses = combinedBusinesses;
  }
  
  approveAll(){
    this.adminService.approveAllBusinesses();
  }

  approveBusiness(businessId : string){
    this.adminService.approveBusiness(businessId);
  }

  disapproveBusiness(businessId : string){
    this.adminService.disapproveBusiness(businessId);
  }

  setUser(businessId : string, event : any){
    this.adminService.addDriverRole(event.target.value,businessId)
  }

  openBusiness(businessId : string){
    this.adminService.openBusiness(businessId);
  }

  closeBusiness(businessId : string){
    this.adminService.closeBusiness(businessId);
  }
  

}
