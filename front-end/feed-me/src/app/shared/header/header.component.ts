import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Renderer2,
  Output,
} from "@angular/core";

import { AuthService } from "../../core/authentication/authentication.service";
import { Role } from "src/app/core/models/role.enum";
import { ModalService } from "../modal/modal.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  role: Role;

  @ViewChild("nav", { static: false }) nav: ElementRef;
  @ViewChild("header", { static: false }) header: ElementRef;

  @Output() openCartEmitter = new EventEmitter();
  @Output() changeDisplayEmitter = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.role = this.authService.getCurrentRole();
    this.role = Role.HomeChef;
  }

  logout() {
    this.authService.logout();
  }

  openForm(option: string) {
    this.closeNav();
    this.modalService.open(option);
  }

  openNav() {
    this.renderer.setStyle(this.nav.nativeElement, "left", "0");
  }

  closeNav() {
    this.renderer.setStyle(this.nav.nativeElement, "left", "-200rem");
  }

  changeDisplay(option: string) {
    this.changeDisplayEmitter.emit(option);
    this.closeNav();
  }
}
