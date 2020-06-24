import { Component } from '@angular/core';

import { AuthService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  displaySidenav: boolean = false;

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  scroll(element: string) {
    document.getElementById(element).scrollIntoView({ behavior: "smooth" });
  }

  openNav() {
    this.displaySidenav = false;
  }

  closeNav() {
    this.displaySidenav = true;
  }

}
