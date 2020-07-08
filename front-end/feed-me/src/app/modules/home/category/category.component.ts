import { Component, OnInit, Input } from "@angular/core";

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
  error: boolean = false;
  displayBusiness: boolean = false;
  loading: boolean = true;

  @Input() category: any;

  constructor(
    public snackbarService: SnackbarService,
    public categoryService: CategoriesService,
    private homeChefService: HomeChefService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.scrollAndGet();
  }

  scrollAndGet() {
    window.scroll(0, 0);
    this.error = false;
    this.businesses = [];
    this.sortCategories();
    this.getBusinesses();
  }

  sortCategories() {
    this.categoryService.categories.sort(category => {
      return category == this.category ? -1 : 1;
    });
  }

  getBusinesses() {
    this.homeChefService.getBusinessesByCategory(this.category.categoryId)
      .then(response => {
        this.businesses = response;
        this.loading = false;
        // this.filterBusinesses();
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
        this.snackbarService.error("Could not load this page. Please try again later.")
      })
  }

  filterBusinesses() {
    this.businesses = this.businesses.filter(
      (business) => business.operationalStatusId !== 1
    );
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
}
