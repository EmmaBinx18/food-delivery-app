import { Component, OnInit, Input } from '@angular/core';
import { MapboxService } from "../../core/services/mapbox.service";
import * as mapboxgl from 'mapbox-gl'
import { OrdersService } from 'src/app/core/services/orders.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() type: string;

  map: mapboxgl.Map;

  types = {
    "address": () => this.registerMap(),
    "tracking": () => this.trackingMap(),
    "driver": () => this.driverMap()
  }

  constructor(
    private mapService: MapboxService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.types[this.type]();
  }

  registerMap() {
    this.mapService.buildRegisterMap(this.map);
  }

  trackingMap() {

  }

  driverMap() {
    // this.mapService.buildMap(this.map, 'address');
  }

}
