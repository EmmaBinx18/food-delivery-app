import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { HomeChefService } from 'src/app/core/services/home-chef.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  meals: any = [];

  constructor(
    public authService: AuthService,
    public homeChefService: HomeChefService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.meals = this.homeChefService.getBusinessMeals();
  }

  openForm() {
    this.modalService.open('product');
  }

}
