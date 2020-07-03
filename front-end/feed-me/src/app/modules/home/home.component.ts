import { Component, OnInit } from "@angular/core";
import { SnackbarService } from "src/app/shared/snackbar/snackbar.service";
import { Subject } from "rxjs";

import { AuthService } from "src/app/core/authentication/authentication.service";
import { Role } from "src/app/core/models/role.model";
import { ModalService } from "src/app/shared/modal/modal.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  role: Role;
  cart: boolean = false;
  modalSubject: Subject<any> = new Subject<any>();

  constructor(
    public authService: AuthService,
    public snackbar: SnackbarService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.cart = false;
    this.role = this.authService.getCurrentRole();
  }

  openForm(option: string) {
    window.scroll(0, 0);
    this.modalSubject.next(this.modalService.open(option));
  }

  openCart() {
    this.cart = true;
  }
}
