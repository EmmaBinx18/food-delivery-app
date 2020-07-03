import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import * as mapboxgl from 'mapbox-gl'

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 45.899977;
  lng = 6.172652;
  zoom = 12;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMarkers() {
    const geoJson = [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': ['0', '0']
      },
      'properties': {
        'message': 'Chennai'
      }
    }, {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': ['77.350048', '12.953847']
      },
      'properties': {
        'message': 'bangulare'
      }
    }];
    return geoJson;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    })

    var radius = 20;
 
    function pointOnCircle(angle) {
    return {
    'type': 'Point',
    'coordinates': [Math.cos(angle) * radius, Math.sin(angle) * radius]
    };
    }

    this.map.on('load', ()=> {
      // Add a source and layer displaying a point which will be animated in a circle.
      console.log('calling map.onload');
      this.map.addSource('point', {
      'type': 'geojson',
      'data': pointOnCircle(0)
      });
       
      this.map.addLayer({
      'id': 'point',
      'source': 'point',
      'type': 'circle',
      'paint': {
      'circle-radius': 10,
      'circle-color': '#007cbf'
      }
      });
       
      let animateMarker = (timestamp)=> {
      // Update the data to a new position based on the animation timestamp. The
      // divisor in the expression `timestamp / 1000` controls the animation speed.
      this.map.getSource('point').setData(pointOnCircle(timestamp / 1000));
       
      // Request the next frame of the animation.
      requestAnimationFrame(animateMarker);
      }
       
      // Start the animation.
      animateMarker(0);
      });
    
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
  }
}
