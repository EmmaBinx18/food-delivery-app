import { Component, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../core/authentication/authentication.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Output() openFormEmitter = new EventEmitter<string>();

  constructor(private authService: AuthService, public modalService: ModalService) { }

  logout() {
    this.authService.logout();
  }

  scroll(element: string) {
    document.getElementById(`${element}`).scrollIntoView({ behavior: "smooth" });
  }

  openForm(option: string) {
    this.modalService.open(option);
  }
}
