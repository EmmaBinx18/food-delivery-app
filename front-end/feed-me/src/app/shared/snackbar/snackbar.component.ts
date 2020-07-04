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
      this.snackbar = value;
      this.renderer.removeClass(component, 'snackbar-error');
      this.renderer.removeClass(component, 'snackbar-success');
      this.renderer.addClass(component, this.snackbar.class);
      component.querySelector('#snackbar-message').innerHTML = this.snackbar.message;
      this.show();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  show() {
    const component = this.el.nativeElement.querySelector('#snackbar');
    this.renderer.addClass(component, 'show');
    setTimeout(() => {
      this.renderer.removeClass(component, 'show');
      this.renderer.addClass(component, 'hide');
      this.snackbarService.hide();
    }, 4000);
  }
}
