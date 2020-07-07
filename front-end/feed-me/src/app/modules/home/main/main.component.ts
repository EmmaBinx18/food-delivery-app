import { Component, Output, EventEmitter } from '@angular/core';

import { Role } from 'src/app/core/models/role.enum';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  role: Role;

  @Output() openCategoryEmitter = new EventEmitter<any>();
  @Output() changeDisplatEmitter = new EventEmitter<any>();

  constructor(private authService: AuthService) {
    this.role = this.authService.getCurrentRole();
  }

  openCategory(event: any) {
    this.openCategoryEmitter.emit(event);
  }

  changeDisplay(option: string) {
    this.changeDisplatEmitter.emit(option);
  }

}
