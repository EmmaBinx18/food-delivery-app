import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "src/app/core/authentication/authentication.service";
import { HomeChefService } from "src/app/core/services/home-chef.service";
import { CategoriesService } from "src/app/core/services/categories.service";
import { SnackbarService } from "src/app/shared/snackbar/snackbar.service";
import { ModalService } from 'src/app/shared/modal/modal.service';
import { MapboxService } from 'src/app/core/services/mapbox.service';

@Component({
  selector: "app-home-chef-register",
  templateUrl: "./home-chef-register.component.html",
  styleUrls: ["./home-chef-register.component.scss"],
})
export class HomeChefRegisterComponent implements OnInit {
  registerForm: FormGroup;
  categories: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private homeChefService: HomeChefService,
    private categoryService: CategoriesService,
    public snackbar: SnackbarService,
    public modalService: ModalService,
    private mapService: MapboxService
  ) { }

  ngOnInit() {
    this.categories = this.categoryService.categories;
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      uid: [this.authService.getCurrentUser().uid],
      businessName: ["", [Validators.required]],
      category: ["", [Validators.required]],
      address: [""]
    });
  }

  setCategory(event: any) {
    this.registerForm
      .get("category")
      .setValue(event.target.value, { onlySelf: true });
  }

  setAddress() {
    const address = {
      addressId: -1,
      address: this.mapService.address.place_name,
      geometry: this.mapService.address.geometry,
      userId: null
    };

    this.registerForm.get("address").setValue(address);
  }

  register() {
    this.setAddress();
    if (this.registerForm.valid) {
      this.homeChefService
        .registerBusiness(this.registerForm.value)
        .then(() => {
          this.snackbar.show({ message: "Successfully sent business registration request", class: "snackbar-success" });
          this.modalService.close();
        })
        .catch(() => {
          this.snackbar.show({ message: "Could not register business. Please try again later", class: "snackbar-error" });
        });
    }
  }
}
