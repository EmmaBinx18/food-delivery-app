import { Component, Input } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {

  private eventsSubscription: Subscription;
  @Input() modalSubscription: Observable<string>;

  component: any

  // displayRegisterHomeChef: boolean = false;
  // displayRegisterDeliveryDriver: boolean = false;


  // hide = {
  //   homeChef: () => { this.displayRegisterHomeChef = false; },
  //   driver: () => { this.displayRegisterDeliveryDriver = false; }
  // }

  // show = {
  //   homeChef: () => { this.displayRegisterHomeChef = true; },
  //   driver: () => { this.displayRegisterDeliveryDriver = true; }
  // }

  constructor(public snackbar: SnackbarService) { }

  ngOnInit() {
    // this.eventsSubscription = this.modalSubscription.subscribe((data) => this.show[data]());
    this.eventsSubscription = this.modalSubscription.subscribe((data) => {
      this.component = data;
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  // closeForm(option: string) {
  //   this.hide[option]();
  // }

  // closeForm() {
  //   this.display = false;
  // }

}
