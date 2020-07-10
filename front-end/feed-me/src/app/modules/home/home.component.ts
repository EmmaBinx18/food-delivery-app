<<<<<<< HEAD
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
=======
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  category: any;

  display = {
    main: true,
    category: false,
    cart: false,
  };

  constructor() { }

  ngOnInit() {
    this.category = "";
    window.scroll(0, 0);
  }

  setAllFalse() {
    Object.keys(this.display).forEach((key) => {
      this.display[key] = false;
    });
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974
  }

  changeDisplay(option: string, category?: any) {
    this.setAllFalse();
    this.display[option] = true;

    if (category) {
      this.category = category;
    }
  }
}
