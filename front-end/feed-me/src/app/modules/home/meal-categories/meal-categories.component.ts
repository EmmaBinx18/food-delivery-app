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
        this.categories = response;
        this.filteredCategories = this.categories;
        this.filterCategories();
      })
      .catch(() => {
        this.errorEmitter.emit('Could not load categories. Only the defaults will be available.');
        this.categories = this.categoryService.getDefaultCategories();
        this.filteredCategories = this.categories;
        this.filterCategories();
      });
  }

  ngOnChanges() {
    this.filterCategories();
  }

  openCategory(category: string) {
    this.router.navigate(['/home', category.toLowerCase()]);
  }

  filterCategories() {
    if (this.removeCategory) {
      this.filteredCategories = this.categories.filter(category => {
        return category.name.toLowerCase() != this.removeCategory;
      });
    }
  }
}
