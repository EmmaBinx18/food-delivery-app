import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnChanges {

  @Input() businesses: any;
  @Input() users: any;
  @Input() error: boolean;

  loading: boolean = true;
  operationalStatuses: any = [];

  @Output() refreshEmitter = new EventEmitter();

  constructor(
    private homeChefService: HomeChefService,
    public snackbarService: SnackbarService,
    public adminService: AdminService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach(key => {
      if (changes[key].currentValue != null) {
        this.getOperationalStatusById();
        this.mapUserNames();
        this.loading = false;
      }
    })
  }

  mapUserNames() {
    this.businesses.forEach(business => {
      const user = this.users.find(user => user.userId == business.userId);
      business.userId = `${user.firstname} ${user.lastname}`;
    });
  }

  getOperationalStatusById() {
    this.homeChefService.getOperationalStatusById('-1')
      .then(response => {
        this.operationalStatuses = response;
        this.getStatuses();
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
        this.snackbarService.error('Could not load operational statuses');
      })
  }

  getStatuses() {
    let combinedBusinesses = [];
    this.businesses.forEach(business => {
      const operational = this.operationalStatuses.find(status => status.operationalStatusId == business.operationalStatusId);
      combinedBusinesses.push({ ...business, operationalStatus: operational.name });
    });
    this.businesses = combinedBusinesses;
  }

  approveAll() {
    this.adminService.approveAllBusinesses()
      .then(() => {
        this.snackbarService.success('Successfully approved all businesses');
        this.refreshEmitter.emit();
      })
      .catch(() => {
        this.snackbarService.error('Could not approve all businesses. Please try again later.');
      })
  }

  approveBusiness(businessId: string) {
    this.adminService.approveBusiness(businessId)
      .then(() => {
        this.snackbarService.success('Successfully approved business');
        this.refreshEmitter.emit();
      })
      .catch(() => {
        this.snackbarService.error('Could not approve business. Please try again later.');
      });
  }

  disapproveBusiness(businessId: string) {
    this.adminService.disapproveBusiness(businessId)
      .then(() => {
        this.snackbarService.success('Successfully denied business registration request');
        this.refreshEmitter.emit();
      })
      .catch(() => {
        this.snackbarService.error('Could not deny business registration request. Please try again later.');
      });
  }

  setUser(businessId: string, event: any) {
    this.adminService.addBusinessRole(event.target.value, businessId)
      .then(() => {
        this.snackbarService.success('Successfully added home chef to business');
        this.refreshEmitter.emit();
      })
      .catch(() => {
        this.snackbarService.error('Could not assign user to business. Please try again later.');
      });
  }

  // openBusiness(businessId: string) {
  //   this.adminService.openBusiness(businessId)
  //   .then(() => {

  //   })
  // }

  // closeBusiness(businessId: string) {
  //   this.adminService.closeBusiness(businessId);
  // }

}
