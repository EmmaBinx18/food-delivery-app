import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from 'src/app/core/services/categories.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-meal-categories',
  templateUrl: './meal-categories.component.html',
  styleUrls: ['./meal-categories.component.scss']
})
export class MealCategoriesComponent implements OnInit, OnChanges {

  @Input() removeCategory?: string;

  categories: any = [];
  filteredCategories: any = [];

  @Output() openCategoryEmitter = new EventEmitter<any>();

  constructor(
    public router: Router,
    public categoryService: CategoriesService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.categoryService.getAllCategories()
      .then(response => {
        this.categories = response;
        this.filteredCategories = this.categories;
        this.filterCategories();
      })
      .catch(() => {
        this.snackbarService.show({ message: 'Could not load categories. Only the defaults will be available.', class: 'snackbar-error' });
        this.categories = this.categoryService.getDefaultCategories();
        this.filteredCategories = this.categories;
        this.filterCategories();
      });
  }

  ngOnChanges() {
    this.filterCategories();
  }

  openCategory(category: string) {
    this.openCategoryEmitter.emit(category);
  }

  filterCategories() {
    if (this.removeCategory) {
      this.filteredCategories = this.categories.filter(category => {
        return category.name.toLowerCase() != this.removeCategory;
      });
    }
  }
}
