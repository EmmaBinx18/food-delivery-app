import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalService } from 'src/app/shared/modal/modal.service';
import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  business: any;

  constructor(
    private formBuilder: FormBuilder,
    public modalService: ModalService,
    private homeChefService: HomeChefService,
    private authService: AuthService,
    public snackbarService: SnackbarService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.getUserBusiness();
    this.initForm();
  }

  getUserBusiness() {
    this.homeChefService.getBusinessByUserId(this.authService.getCurrentUser().uid)
      .then(response => {
        this.business = response[0];
      })
      .catch(() => {
        this.snackbarService.error('Could not load your business. Please try again later.');
      });
  }

  initForm() {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      businessId: [''],
      availabilityStatusId: [1],
      price: [0, [Validators.required, Validators.min(0)]],
      minPrepareTime: [0, [Validators.required, Validators.min(0)]]
    });
  }

  setBusinessId() {
    this.addProductForm
      .get("category")
      .setValue(this.business.businessId, { onlySelf: true });
  }

  addMeal() {
    this.setBusinessId();
    if (this.addProductForm.valid) {
      this.productsService.insertProduct(this.addProductForm.value)
        .then(() => {
          this.closeModal();
          this.snackbarService.success('Successfully added new product');
        })
        .catch(() => {
          this.snackbarService.error('Could not add new product. Please try again later.');
        });
    }
  }

  closeModal() {
    this.modalService.close();
  }

}
