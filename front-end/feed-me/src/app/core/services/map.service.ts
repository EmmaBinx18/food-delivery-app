import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { AngularFireDatabase } from 'angularfire2/database';

import { GeoJson } from '../models/map';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: any;
  constructor(private db: AngularFireDatabase) {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 3,
      center: [-122.41, 37.75]
    });
  }


  getMarkers() {
    return this.db.list('/markers')
  }

  createMarker(data: GeoJson) {
    return this.db.list('/markers')
                  .push(data)
  }

  removeMarker($key: string) {
    return this.db.object('/markers/' + $key).remove()
  }

}