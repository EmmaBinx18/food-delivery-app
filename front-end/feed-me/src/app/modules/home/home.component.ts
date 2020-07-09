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
    window.scroll(0, 0);
  }

  setAllFalse() {
    Object.keys(this.display).forEach((key) => {
      this.display[key] = false;
    });
  }

  changeDisplay(option: string, category?: any) {
    this.setAllFalse();
    this.display[option] = true;

    if (category) {
      this.category = category;
    }
  }
}
