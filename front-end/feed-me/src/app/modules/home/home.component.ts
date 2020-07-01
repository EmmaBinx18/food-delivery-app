import { Component, OnInit } from '@angular/core';

import { NavService } from 'src/app/shared/services/nav.service';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { Role } from 'src/app/core/models/role.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role: Role;
  modalSubject: Subject<string> = new Subject<string>();

  constructor(
    public navService: NavService,
    public authService: AuthService,
    public snackbar: SnackbarService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.role = this.authService.getCurrentRole();
  }

  openForm(option: string) {
    window.scroll(0, 0);
    this.modalSubject.next(option);
  }

}
