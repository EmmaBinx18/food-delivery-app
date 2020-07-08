import { Component, OnInit, Input } from '@angular/core';

import { MapboxService } from "../../core/services/mapbox.service";
import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() type: string;
  @Input() delivery?: any;

  map: mapboxgl.Map;

  types = {
    address: () => this.registerMap(),
    tracking: () => this.trackingMap(),
    driver: () => this.driverMap()
  }

  constructor(private mapService: MapboxService) { }

  ngOnInit() {
    this.types[this.type]();
  }

  registerMap() {
    this.mapService.renderAddressMap(this.map);
  }

  trackingMap() {
    // this.mapService.loadLocationMarkers().then(() => {
    //   this.mapService.renderTrackingMap(this.map);
    // });
  }

  driverMap() {
    this.mapService.loadLocationMarkers(this.delivery.orderId).then(() => {
      this.mapService.renderDriverMap(this.map);
    });
  }

}
