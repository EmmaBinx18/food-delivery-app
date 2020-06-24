import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  @Input() display: boolean;
  @Output() closeNavEmitter = new EventEmitter();

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  closeNav() {
    this.closeNavEmitter.emit();
  }

}
