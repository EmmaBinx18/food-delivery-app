import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from 'src/app/core/services/categories.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-meal-categories',
  templateUrl: './meal-categories.component.html',
  styleUrls: ['./meal-categories.component.scss']
})
export class MealCategoriesComponent implements OnInit {

  filteredCategories: any = [];

  @Input() removeCategory?: string;
  @Output() openCategoryEmitter = new EventEmitter<any>();

  constructor(
    public router: Router,
    public categoryService: CategoriesService,
    public snackbarService: SnackbarService,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.categoryService.getAllCategories()
      .then(response => {
        this.categoryService.categories = response;
        this.setSrc();
      })
      .catch(() => {
        this.categoryService.categories = this.categoryService.getDefaultCategories();
        this.categoryService.categories.forEach(element => {
          element.image = `url(${element.image})`
        });
      });
  }

  setSrc() {
    this.categoryService.categories.forEach(element => {
      element.image = this.sanitization.bypassSecurityTrustStyle(`url(data:image/jpg+xml;base64,${element.image})`);
      element['icon'] = `/assets/icons/meals/${element.name.toLowercase()}.png`;
    });
  }

  openCategory(category: string) {
    this.openCategoryEmitter.emit(category);
  }
}
