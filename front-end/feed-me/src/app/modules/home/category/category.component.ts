import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavService } from '../../../shared/services/nav.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { CategoriesService } from '../../../core/services/categories.service';
import { HomeChefService } from '../../../core/services/home-chef.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  chosenCategory: string;
  chosenCategoryId: string;
  displayRegisterHomeChef: boolean = false;
  displayBusiness: boolean = false;
  business: any = {};
  businesses: any = [];
  categories: any = [];

  constructor(
    private route: ActivatedRoute,
    public navService: NavService,
    public router: Router,
    public snackbar: SnackbarService,
    public categoryService: CategoriesService,
    private homeChefService: HomeChefService
  ) {
    this.route.params.subscribe(params => {
      this.chosenCategory = params.category;
      this.scrollAndGet();
    });

  }

  ngOnInit() {
    this.scrollAndGet();
  }

  scrollAndGet() {
    window.scroll(0, 0);
    this.getCategories();
  }

  getBusinesses() {
    return this.homeChefService.getBusinessesByCategory(this.chosenCategoryId)
      .then(response => {
        this.businesses = response;
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.businesses.push(response[0]);
        this.filterBusinesses();
      })
      .catch(() => {
        this.snackbar.open('Could not load businesses. Please try again later.', 'snackbar-error');
      });
  }

  filterBusinesses() {
    this.businesses = this.businesses.filter(business => business.operationalStatusId !== 1);
  }

  getCategories() {
    this.categoryService.getAllCategories()
      .then(response => {
        this.categories = response;
        this.chosenCategoryId = this.categories.find(category => category.name == this.chosenCategory).categoryId;
        this.getBusinesses();
      })
      .catch(() => {
        this.snackbar.open('Could not load categories. Only the defaults will be available.', 'snackbar-error');
        this.categories = this.categoryService.getDefaultCategories();
        this.chosenCategoryId = this.categories.find(category => category.name === this.chosenCategory).categoryId;
        this.getBusinesses();
      });
  }

  registerHomeChef() {
    window.scroll(0, 0);
    this.displayRegisterHomeChef = true;
  }

  changeCategory(category: string) {
    this.router.navigate(['/home', category]);
  }

  closeRegisterBusinessForm() {
    this.displayRegisterHomeChef = false;
  }

  openBusiness(business: any) {
    this.displayBusiness = true;
    this.business = business
  }

  hideBusiness() {
    this.displayBusiness = false;
  }

}
