import { Component } from '@angular/core';

import { AuthService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

}
