import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

import * as mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from 'mapbox-gl-geocoder'
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import { AddressService } from './address.service';
import { OrdersService } from './orders.service';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  lat = 45.899977;
  lng = 6.172652;
  style = 'mapbox://styles/mapbox/streets-v11';
  zoom = 5;
  minzoom = 10;
  address: any
  marker: any
  coordinates: any
  geoJson: any = {}
  destination: any = [];

  constructor(
    private ordersService: OrdersService,
    public addressService: AddressService
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  loadLocationMarkers(orderId: string) {
    return this.ordersService.getActiveOrderReadyProducts(orderId).then(response => {
      this.destination = response[0].coordinates;
      let features = [];
      response[0].locations.forEach(element => {
        features.push(this.mapOrderReadyProduct(element))
      });

      Object.assign(this.geoJson, { type: 'FeatureCollection', features });
    });
  }

  mapOrderReadyProduct(location: any) {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: location.coordinates
      },
      properties: {
        title: location.businessName,
        description: 'hi im a description',
        icon: 'restaurant'
      }
    }
  }

  setMap() {
    return new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [0, 0],
      zoom: this.zoom,
      minzoom: this.minzoom
    });
  }

  renderAddressMap(map: mapboxgl.Map) {
    map = this.setMap();

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserLocation: false
    });

    map.addControl(geolocate);

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
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

      this.marker = new mapboxgl.Marker({ draggable: true }).setLngLat([0, 0])

      geocoder.on('result', (ev) => {
        this.marker
          .addTo(map)
          .setLngLat(ev.result.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({
            offset: 25, closeButton: false,
            closeOnClick: false
          }).setHTML('<p>' + ev.result.place_name + '</p>'));
        this.address = ev.result;
      });
      geolocate.trigger();

      geolocate.on('geolocate', (e) => {
        const position = [e.coords.longitude, e.coords.latitude];
        geocoder.mapboxClient
          .geocodeReverse({
            latitude: position[1],
            longitude: position[0]
          }, (err, res) => {
            this.address = res.features[0];
          });

        if (this.address) {
          this.marker
            .addTo(map)
            .setLngLat(position)
            .setPopup(new mapboxgl.Popup({
              offset: 25, closeButton: false,
              closeOnClick: false
            }).setHTML('<p>' + this.address.place_name + '</p>'));
        }
        else {
          this.marker
            .addTo(map)
            .setLngLat(position)
        }
      });

      this.marker.on('dragend', (e) => {
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
            }).setHTML('<p>' + this.address.place_name + '</p>'));
        }
      });
    });
  }

  renderTrackingMap(map: mapboxgl.Map) {
    map = this.setMap();

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserLocation: true,
      trackUserLocation: true,
      zoom: 15
    });

    map.addControl(geolocate);
    map.on('load', () => {
      map.addSource('points', {
        'type': 'geojson',
        'data': this.geoJson
      });

      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          'icon-image': ['concat', ['get', 'icon'], '-15'],
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });

      geolocate.trigger();
      geolocate.on('geolocate', (e) => {
        this.coordinates = [e.coords.longitude, e.coords.latitude];
      });
    });
  }

  renderDriverMap(map: mapboxgl.Map) {
    map = this.setMap();

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserLocation: true,
      trackUserLocation: true,
      zoom: 20

    });

    map.addControl(geolocate);

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      interactive: false,
      profile: 'mapbox/driving',
      unit: 'metric',
      controls: {
        inputs: false,
        instructions: true
      },
      zoom: 20

    });

    map.addControl(directions, 'top-left');
    map.on('load', () => {
      geolocate.trigger();
      let locationSet = false;
      geolocate.on('geolocate', (e) => {
        this.coordinates = [e.coords.longitude, e.coords.latitude];
        if (this.coordinates && !locationSet) {
          locationSet = true
          directions.setOrigin(this.coordinates);

          let i = 0;
          this.geoJson.features.forEach((marker) => {
            directions.addWaypoint(i, marker.geometry.coordinates)
            i++;
          });
          directions.setDestination(this.destination);
        }
      });
    });
  }
}
