import { Component, Input } from '@angular/core';

import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() products: any;

  constructor(
    public modalService: ModalService
  ) { }

  openForm() {
    this.modalService.open('product');
  }

  removeProduct(product: any) {

  }

}
