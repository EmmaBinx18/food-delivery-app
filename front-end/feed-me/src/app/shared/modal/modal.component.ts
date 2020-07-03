import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from 'rxjs';

import { SnackbarService } from "../snackbar/snackbar.service";
import { ModalService } from './modal.service';

import { HomeChefRegisterComponent } from "../../modules/home/home-chef-register/home-chef-register.component";
import { DeliveryRegisterComponent } from "../../modules/home/delivery-register/delivery-register.component";
import { AddProductComponent } from '../../modules/home/dashboard/home-chef-dashboard/products/add-product/add-product.component';

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit, OnDestroy {
  component: any = null;
  componentSubscription: Observable<any>;
  modalSubscription: Subscription;

  components = {
    homeChef: HomeChefRegisterComponent,
    driver: DeliveryRegisterComponent,
    product: AddProductComponent
  };

  constructor(public modalService: ModalService) {
    this.componentSubscription = this.modalService.componentSubject.asObservable();
  }

  ngOnInit() {
    this.modalSubscription = this.componentSubscription.subscribe(value => {
      if (value == null) { this.component = null; return; }
      this.component = this.components[value];
      window.scroll(0, 0);
    });
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }
}
