import { Component, OnInit } from '@angular/core';
import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private homeChefService: HomeChefService,
    private adminService: AdminService,
    private userService: UserService,
    public snackbarService: SnackbarService
  ) { }

  display = {
    user: false,
    business: false,
  };

  businesses: any = null;
  businessError: boolean = false;

  users: any = null;
  roles: any = null;
  usersError: boolean = false;

  ngOnInit() {
    this.refresh();
  }

  setAllFalse() {
    Object.keys(this.display).forEach((key) => {
      this.display[key] = false;
    });
  }

  changeDisplay(option: string) {
    this.setAllFalse();
    this.display[option] = true;
  }

  refresh() {
    this.businessError = false;
    this.getBusinesses();
    this.getUsers();
    this.getUserRoles();
  }

  getBusinesses() {
    this.homeChefService.getAllBusinesses()
      .then(response => {
        if (response[0].results) {
          this.businesses = [];
        }
        else {
          this.businesses = response;
        }
      })
      .catch(() => {
        this.businessError = true;
        this.snackbarService.error('Could not load businesses. Please try again later.');
      });
  }

  getUsers() {
    this.userService.getAllUsers()
      .then(response => {
        if (response[0].results) {
          this.users = [];
        }
        else {
          this.users = response;
        }
      })
      .catch(() => {
        this.snackbarService.error('Could not get all users. Please try again later.')
      });
  }

  getUserRoles() {
    this.adminService.getUserRoles()
      .then(response => {
        if (response[0].results) {
          this.roles = [];
        }
        else {
          this.roles = response;
        }
      })
      .catch(() => {
        this.snackbarService.error('Could not get all roles. Please try again later.');
      });
  }

}
