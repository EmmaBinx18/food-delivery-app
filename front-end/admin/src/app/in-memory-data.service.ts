import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Food } from './food';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foods = [
    { id: 11, name: 'Pepperoni Pizza',description: 'Lovely tomato' },
    { id: 12, name: 'Nachos',description:'' },
    { id: 13, name: 'Bagel',description:'' },
    { id: 14, name: 'Caesar Salad',description:''},
    { id: 15, name: 'Super Supreme pizza',description:''},
    { id: 16, name: 'Chicken mayo Pizza',description:''},
    { id: 17, name: 'Veggie Burger',description:''},
    { id: 18, name: 'Rib Burger',description:'' },
    { id: 19, name: 'Double cheese Burger',description:'' },
    { id: 20, name: 'Four season Pizza' ,description:''}
    ];
    return {foods};
  }

  // Overrides the genId method to ensure that a food ietms always has an id.
  // If the foods array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // food id + 1.
  genId(foods: Food[]): number {
    return foods.length > 0 ? Math.max(...foods.map(food => food.id)) + 1 : 11;
  }
}