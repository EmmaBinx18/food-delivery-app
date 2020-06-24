import { Component, Output, EventEmitter, Input } from '@angular/core';

import { AuthService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() display: boolean;
  @Output() openNavEmitter = new EventEmitter();

  constructor(private authService: AuthService) { }

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
