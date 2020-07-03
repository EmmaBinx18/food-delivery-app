import { Component, OnInit } from '@angular/core';
import { MapboxService } from "../../core/services/mapbox.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private map: MapboxService) { }

  ngOnInit(): void {
    this.map.buildMap()

  }

}
