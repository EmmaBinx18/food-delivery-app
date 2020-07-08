import { Component, OnDestroy, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements AfterViewInit, OnDestroy {
  snackbar: any = null;
  snackbarSubscription: Observable<any>;
  subscription: Subscription;

  @ViewChild('snackbar', { static: false }) el: ElementRef;

  constructor(public snackbarService: SnackbarService, private renderer: Renderer2) {
    this.snackbarSubscription = this.snackbarService.snackbarSubject.asObservable();
  }

  ngAfterViewInit() {
    const component = this.el.nativeElement.querySelector('#snackbar');
    this.subscription = this.snackbarSubscription.subscribe(value => {
      if (value == null) { this.snackbar = null; return; }
      this.setSnackbar(value, component);
      this.show(component);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setSnackbar(value: any, component: HTMLElement) {
    this.snackbar = value;
    this.removeClasses(component);
    this.renderer.addClass(component, this.snackbar.class);
    component.querySelector('#snackbar-message').innerHTML = this.snackbar.message;
  }

  show(component: HTMLElement) {
    this.renderer.addClass(component, 'show');
    setTimeout(() => {
      this.renderer.removeClass(component, 'show');
      this.renderer.addClass(component, 'hide');
      this.snackbarService.hide();
    }, 4000);
  }

  removeClasses(snackbar: HTMLElement) {
    this.renderer.removeClass(snackbar, 'snackbar-error');
    this.renderer.removeClass(snackbar, 'snackbar-success');
  }
}
