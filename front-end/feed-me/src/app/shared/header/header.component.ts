import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from "@angular/core";

import { AuthService } from "../../core/authentication/authentication.service";
import { ModalService } from "../modal/modal.service";
import { Router } from '@angular/router';
import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { DeliveryService } from 'src/app/core/services/delivery.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {

  @ViewChild("nav", { static: false }) nav: ElementRef;

  @Output() openCartEmitter = new EventEmitter();

  constructor(
    public authService: AuthService,
    public router: Router,
    public modalService: ModalService,
    public homeChefService: HomeChefService,
    public deliveryService: DeliveryService
  ) { }

  logout() {
    this.authService.logout();
  }

  openForm(option: string) {
    this.closeNav();
    this.modalService.open(option);
  }

  openCart() {
    this.openCartEmitter.emit();
  }

  openNav() {
    this.nav.nativeElement.style.left = '0';
  }

  closeNav() {
    this.nav.nativeElement.style.left = '-200rem';
  }

  navigate(option: string) {
    this.closeNav();
    this.modalService.close();
    this.router.navigate([`/${option}`]);
  }
}
