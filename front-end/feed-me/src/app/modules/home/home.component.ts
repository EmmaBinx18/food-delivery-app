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
    dashboard: false,
    account: false,
    cart: false,
  };

  constructor() {}

  ngOnInit() {
    this.category = "";
    window.scroll(0, 0);
  }

  openCart() {
    if (window.innerWidth <= 800) {
      this.changeDisplay("account");
    } else {
      this.display.cart = true;
    }
  }

  closeCart() {
    this.display.cart = false;
  }

  setAllFalse() {
    Object.keys(this.display).forEach((key) => {
      this.display[key] = false;
    });
  }

  changeDisplay(option: string, category?: any) {
    if (option == "cart") {
      this.openCart();
      return;
    }
    this.setAllFalse();
    this.display[option] = true;

    if (category) {
      this.category = category;
    }
  }
}
