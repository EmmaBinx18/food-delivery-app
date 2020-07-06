import { Component, OnInit } from '@angular/core';
import { MapboxService } from '../../../core/services/mapbox.service';
import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-tracking-map',
  templateUrl: './tracking-map.component.html',
  styleUrls: ['./tracking-map.component.css']
})
export class TrackingMapComponent implements OnInit {

  constructor(private mapService: MapboxService ) { }

  map: mapboxgl.Map;

  ngOnInit(): void {
    this.mapService.buildMap(this.map,'tracking')
  }

}
