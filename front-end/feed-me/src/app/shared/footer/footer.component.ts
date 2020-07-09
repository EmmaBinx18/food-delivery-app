import { Component, Output, EventEmitter, Renderer2 } from '@angular/core';

import { AuthService } from '../../core/authentication/authentication.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Output() openFormEmitter = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    public modalService: ModalService,
    private renderer: Renderer2
  ) { }

  logout() {
    this.authService.logout();
  }

  scroll(element: string) {
    this.renderer.selectRootElement(`#${element}`).scrollIntoView({ behavior: "smooth" });
  }

  openForm(option: string) {
    this.modalService.open(option);
  }
}
