import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnChanges {

  @Input() deliveries: any;
  @Input() error: boolean;

  @Output() showDeliveryEmitter = new EventEmitter<any>();

  loading: boolean = true;

  constructor(private commonService: CommonService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.deliveries.currentValue != changes.deliveries.previousValue) {
      if (this.deliveries.length != 0) {
        this.commonService.formatDate(this.deliveries);
      }
      this.loading = false;
    }
  }

  acceptDelivery(delivery: any) {
    this.showDeliveryEmitter.emit(delivery);
  }

}
