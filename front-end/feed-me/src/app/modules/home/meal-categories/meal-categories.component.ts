import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-categories',
  templateUrl: './meal-categories.component.html',
  styleUrls: ['./meal-categories.component.scss']
})
export class MealCategoriesComponent implements OnInit {

  categories = [
    {
      id: 'asian',
      src: '/assets/meal-categories/asian.jpg',
      text: 'ASIAN'
    },
    {
      id: 'indian',
      src: '/assets/meal-categories/indian.jpg',
      text: 'INDIAN'
    },
    {
      id: 'italian',
      src: '/assets/meal-categories/italian.jpg',
      text: 'ITALIAN'
    },
    {
      id: 'mexican',
      src: '/assets/meal-categories/mexican.jpg',
      text: 'MEXICAN'
    },
    {
      id: 'greek',
      src: '/assets/meal-categories/greek.jpg',
      text: 'GREEK'
    },
    {
      id: 'classics',
      src: '/assets/meal-categories/classics.jpg',
      text: 'CLASSICS'
    }
  ]

  constructor(public router: Router) { }

  ngOnInit() {
    //TODO: fetch images from server
  }

  openCategory(category: string) {
    this.router.navigate(['/home', category]);
  }
}
