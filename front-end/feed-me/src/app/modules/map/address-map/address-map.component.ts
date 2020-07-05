import { Component, OnInit } from '@angular/core';
import { MapboxService } from 'src/app/core/services/mapbox.service';
import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.css']
})
export class AddressMapComponent implements OnInit {

  map: mapboxgl.Map;


  constructor( private mapService: MapboxService) { }

  ngOnInit(): void {
    this.mapService.buildMap(this.map,'address')
  }

}
