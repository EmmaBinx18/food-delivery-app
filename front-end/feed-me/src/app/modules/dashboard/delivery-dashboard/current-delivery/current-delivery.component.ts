import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MapboxService } from 'src/app/core/services/mapbox.service';

@Component({
  selector: 'app-current-delivery',
  templateUrl: './current-delivery.component.html',
  styleUrls: ['./current-delivery.component.scss']
})
export class CurrentDeliveryComponent implements OnChanges {

  @Input() delivery: any;
  @Input() order: any;

  loading: boolean = true;

  constructor(public mapboxService: MapboxService) { }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach(key => {
      if (key == 'order' && changes[key].currentValue != null) {
        this.order = this.order[0];
        this.loading = false;
      }
    });
  }

}
