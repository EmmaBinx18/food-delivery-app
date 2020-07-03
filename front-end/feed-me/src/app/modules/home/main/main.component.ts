import { Component, Output, EventEmitter } from '@angular/core';

import { Role } from 'src/app/core/models/role.model';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  role: Role;

  @Output() openCategoryEmitter = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    public modalService: ModalService
  ) {
    this.role = this.authService.getCurrentRole();
  }

  openForm(option: string) {
    this.modalService.open(option);
  }

  openCategory(event: any) {
    this.openCategoryEmitter.emit(event);
  }

}
