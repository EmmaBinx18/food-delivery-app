import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  @Input() profile: any;
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
    if (changes.profile.currentValue != null) {
      this.loading = false;
      this.initProfileForm();
      this.populateForm();
    }
  }

  initProfileForm() {
    this.profileForm = this.formBuilder.group({
      uid: [this.authService.getCurrentUser().uid],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
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
          this.snackbarService.success('Successfully updated profile.');
          this.profile[0] = this.profileForm.value;
        })
        .catch(() => {
          this.snackbarService.error('Could not update your profile. Please try again later.');
        });
    }
  }

  changePassword() {
    this.authService.resetPassword(this.profile[0].email)
      .then(() => {
        this.snackbarService.success('Password reset has been sent to your email');
      })
      .catch(() => {
        this.snackbarService.error('Could not send password reset email. Please try again later.')
      })
  }

}
