import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnChanges {

  @Input() products: any;
  @Input() error: boolean;

  loading: boolean = true;

  constructor(
    public modalService: ModalService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.products.currentValue.length != 0) {
      this.loading = false;
    }
  }

  openForm() {
    this.modalService.open('product');
  }

  removeProduct(product: any) {

  }

}
