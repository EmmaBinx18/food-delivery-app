<<<<<<< HEAD
import { Component } from '@angular/core';

import { AuthService } from '../../core/authentication/authentication.service';
=======
import { Component, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../core/authentication/authentication.service';
import { ModalService } from '../modal/modal.service';
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

<<<<<<< HEAD
  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  scroll(element: string) {
    document.getElementById(`${element}`).scrollIntoView({ behavior: "smooth" });
=======
  @Output() openFormEmitter = new EventEmitter<string>();

  constructor(
    public authService: AuthService,
    public modalService: ModalService
  ) { }

  logout() {
    this.authService.logout();
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974
  }

  scroll(element: string) {
    document.getElementById(`${element}`).scrollIntoView({ behavior: "smooth" });
  }

  openForm(option: string) {
    this.modalService.open(option);
  }
}
