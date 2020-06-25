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
    this.userRole = this.authService.currentRole;
  }

  logout() {
    this.authService.logout();
  }

  scroll(element: string) {
    if (this.router.url.match(/home[/]/g)) {
      this.router.navigate(['/home']);
    }
    else {
      document.getElementById(element).scrollIntoView({ behavior: "smooth" });
    }
  }

  openNav() {
    this.openNavEmitter.emit();
  }

}
