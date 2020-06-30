import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from 'src/app/core/authentication/authentication.service';
import { HomeChefService } from 'src/app/core/services/home-chef.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {

  @Output() openModalEmitter = new EventEmitter();

  meals: any = [];

  constructor(
    public authService: AuthService,
    public homeChefService: HomeChefService
  ) { }

  ngOnInit() {
    this.meals = this.homeChefService.getBusinessMeals();
  }

  openModal() {
    this.openModalEmitter.emit();
  }

}
