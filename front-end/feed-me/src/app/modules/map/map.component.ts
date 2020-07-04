import { Component, OnInit } from '@angular/core';
import { MapboxService } from "../../core/services/mapbox.service";
import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;

  constructor(private mapService: MapboxService) { }

  ngOnInit(): void {
    this.mapService.buildMap(this.map,'address')
  }

}
