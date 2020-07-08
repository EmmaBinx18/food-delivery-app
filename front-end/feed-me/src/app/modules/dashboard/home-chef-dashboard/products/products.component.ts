import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { Product } from 'src/app/core/models/product.model';

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
    public modalService: ModalService,
    public snackbarService: SnackbarService,
    private productsService: ProductsService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.products.currentValue.length != 0) {
      this.loading = false;
    }
  }

  openForm() {
    this.modalService.open('product');
  }

  removeProduct(product: Product) {
    this.productsService.removeProduct(product.productId)
      .then(() => {
        this.updateProducts(product);
        this.snackbarService.success('Successfully removed product');
      })
      .catch(() => {
        this.snackbarService.error('Could not remove product. Please try again later.');
      })
  }

  updateProducts(product: Product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

}
