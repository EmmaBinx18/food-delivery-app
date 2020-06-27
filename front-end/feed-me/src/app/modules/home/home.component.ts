import { Component, OnInit } from '@angular/core';

import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displaySidenav: boolean = false;
  displayRegisterHomeChef: boolean = false;

  constructor(public snackbar: SnackbarService) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  openNav() {
    this.displaySidenav = true;
  }

  closeNav() {
    this.displaySidenav = false;
  }

  registerHomeChef() {
    window.scroll(0, 0);
    this.displayRegisterHomeChef = true;
  }

  closeRegisterBusinessForm() {
    this.displayRegisterHomeChef = false;
  }

}
