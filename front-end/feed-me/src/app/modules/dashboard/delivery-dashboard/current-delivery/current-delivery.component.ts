import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MapboxService } from 'src/app/core/services/mapbox.service';

@Component({
  selector: 'app-current-delivery',
  templateUrl: './current-delivery.component.html',
  styleUrls: ['./current-delivery.component.scss']
})
export class CurrentDeliveryComponent implements OnChanges {

  @Input() delivery: any;

  constructor(public mapboxService: MapboxService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.delivery.currentValue) {

    }
  }

}
