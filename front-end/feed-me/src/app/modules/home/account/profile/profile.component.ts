import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() profile: any;
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.profileForm = this.initForm();
    this.populateForm();
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
      firstname: this.profile.firstname,
      lastname: this.profile.lastname,
      phone: this.profile.phone,
      email: this.profile.email
    })
  }

  saveChanges() {
    if (this.profileForm.valid) {

    }
  }

}
