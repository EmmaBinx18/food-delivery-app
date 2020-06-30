import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/authentication/authentication.service';
import { Role } from 'src/app/core/models/role.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() display: boolean;
  @Output() openNavEmitter = new EventEmitter();

  userRole: Role;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userRole = this.authService.getCurrentRole();
  }

  logout() {
    this.authService.logout();
  }

  scroll(element: string) {
    document.getElementById(element).scrollIntoView({ behavior: "smooth" });
  }

  openNav() {
    this.openNavEmitter.emit();
  }

}
