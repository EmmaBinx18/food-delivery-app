import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Subject } from 'rxjs';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { Role } from 'src/app/core/models/role.model';
import { HomeChefRegisterComponent } from './home-chef-register/home-chef-register.component';
import { DeliveryRegisterComponent } from './delivery-register/delivery-register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role: Role;

  displayModal: boolean = false;
  modalComponent: any = null;
  modalSubject: Subject<string> = new Subject<string>();

  constructor(
    public authService: AuthService,
    public snackbar: SnackbarService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.role = this.authService.getCurrentRole();
  }

  // openForm(option: string) {
  //   window.scroll(0, 0);
  //   this.modalSubject.next(option);
  // }

  openForm() {
    window.scroll(0, 0);
    this.modalSubject.next(option);
  }

}
