import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements AfterViewInit, OnInit {

  category: string;
  displaySidenav: boolean = false;
  displayRegisterHomeChef: boolean = false;
  businesses: any;

  @ViewChild('content') content: ElementRef;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.category = params.category);
  }

  ngOnInit() {
    window.scroll(0, 0);
    //need to fetch all businesses for category
  }

  ngAfterViewInit() {
    this.content.nativeElement.style.backgroundImage = `url(/assets/meal-categories/${this.category}.jpg)`;
  }

  openNav() {
    this.displaySidenav = true;
  }

  closeNav() {
    this.displaySidenav = false;
  }

  registerHomeChef() {
    window.scroll(0, 0);
    this.displayRegisterHomeChef = true;
  }

  closeRegisterBusinessForm() {
    this.displayRegisterHomeChef = false;
  }

}
