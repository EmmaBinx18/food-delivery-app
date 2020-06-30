import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavService } from 'src/app/core/services/nav.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: string;
  displayRegisterHomeChef: boolean = false;
  businesses: any;

  constructor(
    private route: ActivatedRoute,
    public navService: NavService,
    public router: Router,
    public snackbar: SnackbarService
  ) {
    this.route.params.subscribe(params => {
      this.category = params.category;
      window.scroll(0, 0);
    });

  }

  ngOnInit() {
    window.scroll(0, 0);
  }

  registerHomeChef() {
    window.scroll(0, 0);
    this.displayRegisterHomeChef = true;
  }

  closeRegisterBusinessForm() {
    this.displayRegisterHomeChef = false;
  }

}
