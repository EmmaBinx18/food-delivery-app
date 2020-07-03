import { Component, OnInit } from "@angular/core";
import { SnackbarService } from "src/app/shared/snackbar/snackbar.service";
import { Subject } from "rxjs";

import { ModalService } from "src/app/shared/modal/modal.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  modalSubject: Subject<any> = new Subject<any>();

  cart: boolean = false;
  category: any;

  display = {
    main: true,
    category: false,
    dashboard: false
  }

  constructor(
    public snackbar: SnackbarService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.category = '';
    window.scroll(0, 0);
  }

  openForm(option: string) {
    window.scroll(0, 0);
    this.modalSubject.next(this.modalService.open(option));
  }

  openCart() {
    this.cart = true;
  }

  closeCart() {
    this.cart = false;
  }

  setAllFalse() {
    Object.keys(this.display).forEach(key => {
      this.display[key] = false;
    });
  }

  changeDisplay(option: string, category?: any) {
    this.setAllFalse();
    this.display[option] = true;
    this.category = category;
  }
}
