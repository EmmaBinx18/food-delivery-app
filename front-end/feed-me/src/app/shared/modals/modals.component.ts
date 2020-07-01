import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnChanges {

  displayRegisterHomeChef: boolean = false;
  displayRegisterDeliveryDriver: boolean = false;

  private eventsSubscription: Subscription;

  @Input() modalSubscription: Observable<string>;

  hide = {
    homeChef: () => { this.displayRegisterHomeChef = false; },
    driver: () => { this.displayRegisterDeliveryDriver = false; }
  }

  show = {
    homeChef: () => { this.displayRegisterHomeChef = true; },
    driver: () => { this.displayRegisterDeliveryDriver = true; }
  }

  constructor(public snackbar: SnackbarService) { }

  ngOnInit() {
    this.eventsSubscription = this.modalSubscription.subscribe((data) => this.show[data]());
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // if (changes.modal.currentValue !== undefined) {
    //   this.show[changes.modal.currentValue]();
    // }
  }

  closeForm(option: string) {
    this.hide[option]();
  }

}
