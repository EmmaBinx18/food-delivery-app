<<<<<<< HEAD
import { Component, Output, EventEmitter, Input } from '@angular/core';

import { AuthService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() display: boolean;
  @Output() openNavEmitter = new EventEmitter();

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  scroll(element: string) {
    document.getElementById(element).scrollIntoView({ behavior: "smooth" });
  }

  openNav() {
    this.openNavEmitter.emit();
=======
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
    public modalService: ModalService
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
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974
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
