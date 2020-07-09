import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { MapboxService } from 'src/app/core/services/mapbox.service';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-current-delivery',
  templateUrl: './current-delivery.component.html',
  styleUrls: ['./current-delivery.component.scss']
})
export class CurrentDeliveryComponent implements OnChanges {

  @Input() delivery: any;
  @Input() order: any;

  loading: boolean = true;
  orderComplete: boolean = false;

  pickup: any = [];

  @Output() deliveryRefreshEmitter = new EventEmitter();

  constructor(
    private deliveryService: DeliveryService,
    public mapboxService: MapboxService,
    public snackbarService: SnackbarService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach(key => {
      if (key == 'order' && changes[key].currentValue != null) {
        this.order = this.order[0];
        this.loading = false;
        this.setPickup();
      }
    });
  }

  setPickup() {
    this.order.locations.forEach(item => {
      this.pickup.push({ businessId: item.businessId, pickup: false });
    });
  }

  completePickup(business: any) {
    this.deliveryService.pickupOrder(business.businessId, this.order.orderId)
      .then(() => {
        this.pickup.forEach(item => {
          if (item.businessId == business.businessId) {
            item.pickup = true;
          }

          if (this.orderCompleteCheck()) {
            this.orderComplete = true;
          }
        })
      })
      .catch(() => {
        this.snackbarService.error('Could not complete order pickup. Please try again');
      })
  }

  orderCompleteCheck() {
    this.pickup.forEach(item => {
      if (item.pickup == false) return false;
    });
    return true;
  }

  completeDelivery() {
    this.deliveryService.completeDelivery(this.order.orderId)
      .then(() => {
        this.snackbarService.success('Successfully complete delivery');
        this.loading = true;
        this.deliveryRefreshEmitter.emit();
      })
      .catch(() => {
        this.snackbarService.error('Could not complete delivery. Please try again.');
      })
  }

}
