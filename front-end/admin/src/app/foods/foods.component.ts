import { Component, OnInit } from '@angular/core';

import { Food } from '../food';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  foods :Food[];


  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods(): void {
    this.foodService.getFoods()
    .subscribe(foods => this.foods = foods);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.foodService.addFood({ name } as Food)
      .subscribe(food => {
        this.foods.push(food);
      });
  }

  delete(food: Food): void {
    this.foods = this.foods.filter(f => f !== food);
    this.foodService.deleteFood(food).subscribe();
  }
}
