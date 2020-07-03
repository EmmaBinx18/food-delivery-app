import { Component, Output, EventEmitter } from '@angular/core';
import { Role } from 'src/app/core/models/role.model';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  role: Role;

  @Output() openFormEmitter = new EventEmitter<string>();
  @Output() openSnackbarEmitter = new EventEmitter<any>();
  @Output() openCategoryEmitter = new EventEmitter<any>();

  constructor(private authService: AuthService) {
    this.role = this.authService.getCurrentRole();
  }

  openForm(option: string) {
    this.openFormEmitter.emit(option);
  }

  openSnackbar(event: any) {
    this.openSnackbarEmitter.emit(event);
  }

  openCategory(event: any) {
    this.openCategoryEmitter.emit(event);
  }

}
