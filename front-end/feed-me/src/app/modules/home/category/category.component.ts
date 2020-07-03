import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SnackbarService } from "../../../shared/snackbar/snackbar.service";
import { CategoriesService } from "../../../core/services/categories.service";
import { HomeChefService } from "../../../core/services/home-chef.service";
import { Subject } from "rxjs";
import { ModalService } from "src/app/shared/modal/modal.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  chosenCategory: string;
  chosenCategoryId: string;
  business: any = {};
  businesses: any = [];
  categories: any = [];
  error: boolean = false;
  displayBusiness: boolean = false;

  cart: boolean = false;
  modalSubject: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public snackbar: SnackbarService,
    public categoryService: CategoriesService,
    private homeChefService: HomeChefService,
    public modalService: ModalService
  ) {
    this.route.params.subscribe((params) => {
      this.chosenCategory = params.category;
      this.chosenCategory =
        this.chosenCategory.charAt(0).toUpperCase() +
        this.chosenCategory.slice(1);
      this.scrollAndGet();
    });
  }

  ngOnInit() {
    this.cart = false;
    this.scrollAndGet();
  }

  scrollAndGet() {
    window.scroll(0, 0);
    this.error = false;
    this.getCategories();
  }

  getBusinesses() {
    return this.homeChefService
      .getBusinessesByCategory(this.chosenCategoryId)
      .then((response) => {
        // this.businesses = response;
        this.filterBusinesses();
      })
      .catch(() => {
        this.error = true;
        this.snackbar.open(
          "Could not load businesses. Please try again later.",
          "snackbar-error"
        );
      });
  }

  filterBusinesses() {
    this.businesses = this.businesses.filter(
      (business) => business.operationalStatusId !== 1
    );
  }

  getCategories() {
    this.categoryService
      .getAllCategories()
      .then((response) => {
        this.categories = response;
        this.chosenCategoryId = this.categories.find(
          (category) => category.name === this.chosenCategory
        ).categoryId;
        this.getBusinesses();
      })
      .catch(() => {
        this.snackbar.open(
          "Could not load categories. Only the defaults will be available.",
          "snackbar-error"
        );
        this.categories = [...this.categoryService.getDefaultCategories()];
        this.chosenCategoryId = this.categories.find(
          (category) => category.name === this.chosenCategory
        ).categoryId;
        this.getBusinesses();
      });
  }

  openForm(option: string) {
    window.scroll(0, 0);
    this.modalSubject.next(this.modalService.open(option));
  }

  changeCategory(category: string) {
    this.displayBusiness = false;
    this.router.navigate(["/home", category]);
  }

  openBusiness(business: any) {
    this.displayBusiness = true;
    this.business = business;
  }

  hideBusiness() {
    this.displayBusiness = false;
  }

  openCart() {
    this.cart = true;
  }
}
