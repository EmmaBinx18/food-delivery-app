import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Output() closeModalEmitter = new EventEmitter();

  addMealForm: FormGroup;
  businessId: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    //Fetch businessId
    this.addMealForm = this.initForm();
  }

  initForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      businessId: [this.businessId],
      availabilityStatusId: [1],
      price: [0, [Validators.required, Validators.min(0)]],
      minPrepareTime: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addMeal() {
    if (this.addMealForm.valid) {
      //Add meal
    }
  }

  closeModal() {
    this.closeModalEmitter.emit();
  }

}
