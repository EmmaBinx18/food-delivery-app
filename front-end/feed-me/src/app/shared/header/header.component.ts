import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from "@angular/core";

import { AuthService } from "../../core/authentication/authentication.service";
import { Role } from "src/app/core/models/role.enum";
import { ModalService } from "../modal/modal.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  role: Role;

  @ViewChild("nav", { static: false }) nav: ElementRef;

  @Output() openCartEmitter = new EventEmitter();

  constructor(
    private authService: AuthService,
    public router: Router,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.role = this.authService.getCurrentRole();
  }

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
