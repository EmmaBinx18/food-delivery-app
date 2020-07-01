import { Component, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Output() openFormEmitter = new EventEmitter<string>();

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  scroll(element: string) {
    document.getElementById(`${element}`).scrollIntoView({ behavior: "smooth" });
  }

  openForm(option: string) {
    this.openFormEmitter.emit(option);
  }
}
