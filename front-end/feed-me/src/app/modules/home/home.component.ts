import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  displaySidenav: boolean = false;

  constructor() { }

  openNav() {
    this.displaySidenav = true;
  }

  closeNav() {
    this.displaySidenav = false;
  }

}
