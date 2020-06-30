import { Component, OnInit } from '@angular/core';

import { NavService } from 'src/app/core/services/nav.service';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { Role } from 'src/app/core/models/role.model';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayRegisterHomeChef: boolean = false;
  displayRegisterDeliveryDriver: boolean = false;
  role: Role;

  constructor(
    public navService: NavService,
    public authService: AuthService,
    public snackbar: SnackbarService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.role = this.authService.getCurrentRole();
  }

  openForm(option: string) {
    window.scroll(0, 0);
    if (option == 'homeChef') {
      this.displayRegisterHomeChef = true;
    }
    else if (option == 'driver') {
      this.displayRegisterDeliveryDriver = true;
    }
  }

  closeForm(option: string) {
    if (option == 'homeChef') {
      this.displayRegisterHomeChef = false;
    }
    else if (option == 'driver') {
      this.displayRegisterDeliveryDriver = false;
    }
  }

}
