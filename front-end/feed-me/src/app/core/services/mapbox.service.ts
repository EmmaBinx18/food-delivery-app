import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from 'mapbox-gl-geocoder';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  lat = 45.899977;
  lng = 6.172652;
  style = 'mapbox://styles/mapbox/streets-v11';
  zoom = 2;
  minzoom = 10;
  address: any = null;
  marker: any

  constructor(public addressService: AddressService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  buildRegisterMap(map: mapboxgl.Map) {
    map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [0, 0],
      zoom: this.zoom,
      minzoom: this.minzoom
    })

    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserLocation: false
    });

    map.addControl(geolocate);

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      zoom: 10,
      placeholder: 'Enter street address e.g. 123 Streetname',
      mapboxgl: mapboxgl,
      marker: false
    });

    map.addControl(geocoder);

    map.on('load', () => {
      map.addSource('single-point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      });

      this.marker = new mapboxgl.Marker({ draggable: true }).setLngLat([0, 0]);

      geocoder.on('result', (ev) => {
        this.marker
          .addTo(map)
          .setLngLat(ev.result.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({
            offset: 25, closeButton: false,
            closeOnClick: false
          })
            .setHTML('<p>' + ev.result.place_name + '</p>'));
        this.address = ev.result;
      });
      geolocate.trigger();

      geolocate.on('geolocate', (e) => {
        var position = [e.coords.longitude, e.coords.latitude];

        geocoder.mapboxClient
          .geocodeReverse({
            latitude: position[1],
            longitude: position[0]
          }, (err, res) => {
            this.address = res.features[0];
          });

        if (this.address) {
          document.querySelector('#map').querySelector('input').value = this.address.place_name;
          this.marker
            .addTo(map)
            .setLngLat(position)
            .setPopup(new mapboxgl.Popup({
              offset: 25, closeButton: false,
              closeOnClick: false
            })
              .setHTML('<p>' + this.address.place_name + '</p>'));
        }
        else {
          this.marker
            .addTo(map)
            .setLngLat(position)
          geolocate.trigger();
        }
      });

      this.marker.on('dragend', (e) => {
        document.querySelector('#map').querySelector('input').value = this.address.place_name;
        if (this.marker.getLngLat()) {
          var location = this.marker.getLngLat();
          geocoder.mapboxClient
            .geocodeReverse({
              latitude: location.lat,
              longitude: location.lng
            }, (err, res) => {
              this.address = res.features[0];
            });

          this.marker
            .setPopup(new mapboxgl.Popup({
              offset: 25,
              closeButton: false,
              closeOnClick: false
            })
              .setHTML('<p>' + this.address.place_name + '</p>'));
        }
      });
    });
  }

  buildDriverMap() {

  }

}
