import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import * as mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from 'mapbox-gl-geocoder'
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import { AddressService } from './address.service';
import { UserService } from './user.service';


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
  coordinates : any

  constructor(public addressService: AddressService, public userService: UserService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  renderAddressMap(map: mapboxgl.Map){

    map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [0, 0],
      zoom: this.zoom,
      minzoom: this.minzoom
    })

    // map.addControl(new mapboxgl.NavigationControl());
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserLocation: false
      // trackUserLocation: true

    });

    map.addControl(geolocate);

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    map.addControl(geocoder);

    map.on('load', () => {
      //console.log('calling map.onload');

      map.addSource('single-point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      });

      this.marker = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([0, 0])

      geocoder.on('result', (ev) => {
        // map.getSource('single-point').setData(ev.result.geometry);
        this.marker
          .addTo(map)
          .setLngLat(ev.result.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({
            offset: 25, closeButton: false,
            closeOnClick: false
          })// add popups
            .setHTML('<p>' + ev.result.place_name + '</p>'));
        this.address = ev.result;
        //console.log(this.address)
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

        if(this.address){
        this.marker
          .addTo(map)
          .setLngLat(position)
          .setPopup(new mapboxgl.Popup({
            offset: 25, closeButton: false,
            closeOnClick: false
          })// add popups
            .setHTML('<p>' + this.address.place_name + '</p>'));
        }
        else{
          this.marker
          .addTo(map)
          .setLngLat(position)
        }
        //console.log(this.address)
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
            })// add popups
              .setHTML('<p>' + this.address.place_name + '</p>'));
          //console.log(this.address);
        }

        
      });

    });

  }

  renderDriverMap(map: mapboxgl.Map){
    
    map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [0, 0],
      zoom: this.zoom,
      minzoom: this.minzoom
    })

    // map.addControl(new mapboxgl.NavigationControl());
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserLocation: true,
      trackUserLocation: true,
      zoom :15

    });

    map.addControl(geolocate);

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    //map.addControl(geocoder);

    map.on('load', () => {
      //console.log('calling map.onload');

      geolocate.trigger();


      geolocate.on('geolocate', (e) => {
        this.coordinates = [e.coords.longitude, e.coords.latitude];
          console.log(this.coordinates)
        //console.log(this.address)
      });



    });
    

    var geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [18.5067, -33.8892]
        },
        properties: {
          title: 'Canal Walk',
          description: ''
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [18.5098, -33.8825]
        },
        properties: {
          title: 'Sable Square',
          description: ''
        }
      }]
    };

    console.log(geojson)

    geojson.features.forEach( (marker)=> {

      console.log(marker);
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
    
      var m = new mapboxgl.Marker({
        draggable: false
      })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
        
    });
  }

  renderDrivingMap(map: mapboxgl.Map){
    
    map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [0, 0],
      zoom: this.zoom,
      minzoom: this.minzoom
    })

    // map.addControl(new mapboxgl.NavigationControl());
    //var nav = new mapboxgl.NavigationControl();
    //map.addControl(nav, 'top-left');

    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserLocation: true,
      trackUserLocation: true,
      zoom :20

    });

    map.addControl(geolocate);

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      interactive: false,
      profile : 'mapbox/driving-traffic',
      unit  : 'metric',
      controls :{
        inputs : false,
        instructions : false
      },
      zoom:20

    });
    map.addControl(directions, 'top-left');

    //map.addControl(geocoder);

    map.on('load', () => {
      //console.log('calling map.onload');

      geolocate.trigger();

      var locationSet = false;
      geolocate.on('geolocate', (e) => {
        this.coordinates = [e.coords.longitude, e.coords.latitude];
          console.log(this.coordinates)
          if(this.coordinates && !locationSet){
            locationSet = true
            directions.setOrigin(this.coordinates);
            directions.addWaypoint(0,[18.5067, -33.8892])
            directions.setDestination([18.5098, -33.8825]);

            console.log(directions)
            // directions.query();

          }
         
        //console.log(this.address)
      });



      


    });
    

    var geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [18.5067, -33.8892]
        },
        properties: {
          title: 'Canal Walk',
          description: ''
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [18.5098, -33.8825]
        },
        properties: {
          title: 'Sable Square',
          description: ''
        }
      }]
    };

    console.log(geojson)

    geojson.features.forEach( (marker)=> {

      console.log(marker);
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
    
      var m = new mapboxgl.Marker({
        draggable: false
      })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
        
    });
  }

  buildMap(map: mapboxgl.Map, type?: string) {
   
    // if (type == 'address') {
    //   this.renderAddressMap(map);
    //   return;
    // }

    // if(type=='driver')
    // {
    //   this.renderDriverMap(map);
    //   return;
    // }

    // this.renderDrivingMap(map);
    //   return;
  }

}
