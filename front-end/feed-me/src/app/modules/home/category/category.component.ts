import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

import { SnackbarService } from "../../../shared/snackbar/snackbar.service";
import { CategoriesService } from "../../../core/services/categories.service";
import { HomeChefService } from "../../../core/services/home-chef.service";
import { ModalService } from "src/app/shared/modal/modal.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  business: any = {};
  businesses: any = [];
  categories: any = [];
  error: boolean = false;
  displayBusiness: boolean = false;

  cart: boolean = false;

  @Input() category: any;

  @Output() openFormEmitter = new EventEmitter<string>();
  @Output() openSnackbarEmitter = new EventEmitter<any>();

  constructor(
    public snackbar: SnackbarService,
    public categoryService: CategoriesService,
    private homeChefService: HomeChefService,
    public modalService: ModalService
  ) { }

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
      .getBusinessesByCategory(this.category)
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
        this.getBusinesses();
      })
      .catch(() => {
        this.snackbar.open(
          "Could not load categories. Only the defaults will be available.",
          "snackbar-error"
        );
        this.categories = [...this.categoryService.getDefaultCategories()];
        this.getBusinesses();
      });
  }

  changeCategory(category: any) {
    this.displayBusiness = false;
    this.category = category;
    this.scrollAndGet();
  }

  openBusiness(business: any) {
    this.displayBusiness = true;
    this.business = business;
  }

  hideBusiness() {
    this.displayBusiness = false;
  }

  openForm(option: string) {
    this.openFormEmitter.emit(option);
  }

  openSnackbar(event: any) {
    this.openSnackbarEmitter.emit(event);
  }
}
