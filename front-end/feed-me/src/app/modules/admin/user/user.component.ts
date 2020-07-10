import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnChanges {

  @Input() users: any;
  @Input() error: boolean;
  @Input() roles: any;

  loading: boolean = true;

  @Output() refreshEmitter = new EventEmitter();

  constructor(private userService: UserService, public snackbarService: SnackbarService, public adminService: AdminService) { }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach(key => {
      if (changes[key].currentValue != null) {
        this.loading = false;
        this.getRoles();
      }
    });
  }

  deactivateUser(user: any) {
    this.userService.deactivateUser(user.userId)
      .then(() => {
        this.snackbarService.success('Successfully deactivated user account');
        this.refreshEmitter.emit();
      })
      .catch(() => {
        this.snackbarService.error('Could not deactivate user account. Please try again later.');
      })
  }

  activateUser(user: any) {
    this.userService.reactivateUser(user.userId)
      .then(() => {
        this.snackbarService.success('Successfully reactivated user account');
        this.refreshEmitter.emit();
      })
      .catch(() => {
        this.snackbarService.error('Could not reactivate user account. Please try again later.')
      })
  }

  removeUserRole(user: any) {
    this.adminService.removeUserRole(user.userId)
      .then(() => {
        this.snackbarService.success('Successfully removed user from business');
        this.refreshEmitter.emit();
      })
      .catch(() => {
        this.snackbarService.error('Could not remove user from business. Please try again later.');
      })
  }

  getRoles() {
    let users = [];
    this.users.forEach(user => {
      const role = this.roles.find(role => role.roleId == user.roleid);
      if (role) {
        users.push({ ...user, roleName: role.name });
      }
      else {
        users.push({ ...user, roleName: 'Customer' });
      }
    });
    this.users = users;
  }
}
