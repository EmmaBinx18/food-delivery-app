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
  @Input() modalSubscription: Observable<any>;

  component: any = null;

  constructor(public snackbar: SnackbarService) { }

  ngOnInit() {
    this.eventsSubscription = this.modalSubscription.subscribe((data) => {
      this.component = data;
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  closeForm() {
    this.component = null;
  }

}
