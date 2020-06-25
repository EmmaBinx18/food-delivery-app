import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() display: boolean;
  @Output() closeNavEmitter = new EventEmitter();

  userRole: Role;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userRole = this.authService.currentRole;
  }

  logout() {
    this.authService.logout();
  }

  closeNav() {
    this.closeNavEmitter.emit();
  }

}
