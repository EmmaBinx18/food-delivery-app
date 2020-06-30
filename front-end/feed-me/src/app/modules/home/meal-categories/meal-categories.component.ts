import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-meal-categories',
  templateUrl: './meal-categories.component.html',
  styleUrls: ['./meal-categories.component.scss']
})
export class MealCategoriesComponent implements OnInit, OnChanges {

  @Input() removeCategory?: string;

  categories: any = [];
  filteredCategories: any = [];

  @Output() errorEmitter = new EventEmitter<string>();

  constructor(
    public router: Router,
    public categoryService: CategoriesService
  ) { }

  ngOnInit() {
    this.categoryService.getAllCategories()
      .then(response => {
        this.validateImages(response);
        this.filterCategories();
      })
      .catch(() => {
        this.errorEmitter.emit('Could not load categories. Please try again later');
      });
  }

  ngOnChanges() {
    this.filterCategories();
  }

  openCategory(category: string) {
    this.router.navigate(['/home', category.toLowerCase()]);
  }

  validateImages(categories: any) {
    categories.forEach(category => {
      if (!category.src) {
        let image = new Image();
        image.src = `/assets/meal-categories/${category.name.toLowerCase()}.jpg`;
        if (image.complete) {
          category['src'] = '/assets/images/grey.png';
        }
        else {
          category['src'] = `/assets/meal-categories/${category.name.toLowerCase()}.jpg`;
        }
      }
    });
    this.categories = categories;
    this.filteredCategories = categories;
  }

  filterCategories() {
    if (this.removeCategory) {
      this.filteredCategories = this.categories.filter(category => {
        return category.name.toLowerCase() != this.removeCategory;
      });
    }
  }
}
