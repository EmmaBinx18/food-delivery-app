import { Component, OnInit } from '@angular/core';
import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService : UserService, public snackbarService : SnackbarService, public adminService : AdminService) { }

  users: any = [];
  loading: boolean = true;
  error: boolean = false;
  roles : any = []
  

  ngOnInit(): void {
    this.error = false;
    this.loading = true;
    this.users = [];
    this.roles = [];
    Promise.all([
      this.userService.getAllUsers(),    
      this.adminService.getUserRoles()
    ])
      .then(response => {
        this.users = response[0];
        this.loading = false;
        this.roles = response[1];
        this.getRoles();
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
        this.snackbarService.error('Could not load this business. Please try again later.');
      });

      
  }

  deactivateUser(user: any) {
    //console.log(user.userId)
    this.userService.deactivateUser(user.userId);
    //console.log(user)
  }

  activateUser(user: any) {
    //console.log(user.userId)
    this.userService.reactivateUser(user.userId);
    //console.log(user)
  }

  removeUserRole(user: any){
    this.adminService.removeUserRole(user.userId);
  }


  getRoles(){
    let combinedBusinesses = []
    for (let i = 0; i < this.users.length; i++) {      
      for (let j = 0; j < this.roles.length; j++) {
        if (this.users[i].roleid == this.roles[j].roleId) {
          combinedBusinesses.push({ ...this.users[i], roleName: this.roles[j].name })
        }
      }
      if(combinedBusinesses.length - 1 != i)
      {
        combinedBusinesses.push({ ...this.users[i], roleName: 'Customer' })
      }
    }
    this.users = combinedBusinesses;
  }

}
