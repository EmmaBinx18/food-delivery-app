import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnChanges {

  @Input() profile: any = [];
  @Input() error: boolean;

  profileForm: FormGroup;
  loading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.profile.currentValue.length != 0) {
      this.loading = false;
      this.profileForm = this.initForm();
      this.populateForm();
    }
  }

  initForm() {
    return this.formBuilder.group({
      uid: [this.authService.getCurrentUser().uid],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}')]]
    });
  }

  populateForm() {
    this.profileForm.setValue({
      uid: this.authService.getCurrentUser().uid,
      firstname: this.profile[0].firstname,
      lastname: this.profile[0].lastname,
      phone: this.profile[0].phone,
      email: this.profile[0].email
    })
  }

  saveChanges() {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.profileForm.value)
        .then(() => {
          this.snackbarService.show({ message: 'Successfully updated profile.', class: 'success' });
          this.profile[0] = this.profileForm.value;
        })
        .catch(() => {
          this.snackbarService.show({ message: 'Could not update your profile. Please try again later.', class: 'error' });
        });
    }
  }

}
