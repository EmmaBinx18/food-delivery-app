import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import * as mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from 'mapbox-gl-geocoder'
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import { AddressService } from './address.service';
import { UserService } from './user.service';
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
  coordinates : any
  geoJson : any = {}
  destination: any = [];

  constructor(public addressService: AddressService, public userService: UserService, private ordersService : OrdersService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  loadLocationMarkers(){
    return this.ordersService.getActiveOrderReadyProducts('1').then(response => {

      this.destination = response[0].coordinates;
      let features = [];
      console.log(response)
      response[0].locations.forEach(element => {
        features.push(this.mapOrderReadyProduct(element))
      });

      Object.assign(this.geoJson,{type: 'FeatureCollection',features});
      
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

      map.addSource('points' , { 
        'type' : 'geojson',
        'data' : this.geoJson});
        ;
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          // get the icon name from the source's "icon" property
          // concatenate the name to get an icon from the style's sprite sheet
          'icon-image': ['concat', ['get', 'icon'], '-15'],
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });
      geolocate.trigger();


      geolocate.on('geolocate', (e) => {
        this.coordinates = [e.coords.longitude, e.coords.latitude];
          //console.log(this.coordinates)
        //console.log(this.address)
      });



    });
    
    // console.log(geojson)

    // this.geoJson.features.forEach( (marker)=> {

    //   // console.log(marker);
    //   // create a HTML element for each feature
    //   var el = document.createElement('div');
    //   el.className = 'marker';
    
    //   var m = new mapboxgl.Marker({
    //     draggable: false
    //   })
    //   .setLngLat(marker.geometry.coordinates)
    //   .addTo(map);
        
    // });
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
      profile : 'mapbox/driving',
      unit  : 'metric',
      controls :{
        inputs : false,
        instructions : true
      },
      zoom:20

    });
    map.addControl(directions, 'top-left');

    //map.addControl(geocoder);

    map.on('load', () => {
      //console.log('calling map.onload');

      
      // this.geoJson.features.forEach( (marker)=> {
  
        
      //   console.log(marker);
      //   // create a HTML element for each feature
      //   var el = document.createElement('div');
      //   el.className = 'marker';
      
      //   var m = new mapboxgl.Marker({
      //     draggable: false
      //   })
      //   .setLngLat(marker.geometry.coordinates)
      //   .addTo(map);
          
      // });

      geolocate.trigger();

      var locationSet = false;
      geolocate.on('geolocate', (e) => {
        this.coordinates = [e.coords.longitude, e.coords.latitude];
          // console.log(this.coordinates)
          if(this.coordinates && !locationSet){
            locationSet = true
            directions.setOrigin(this.coordinates);

            var i = 0;
            this.geoJson.features.forEach( (marker)=> {         
              directions.addWaypoint(i,marker.geometry.coordinates)
              i++;
              });
            directions.setDestination(this.destination);
          }
      });
    });

  }

  // renderTrackingMap(mapL)
  buildMap(map: mapboxgl.Map, type?: string) {
   
    if (type == 'address') {
      this.renderAddressMap(map);
      return;
    }

    if(type=='driver')
    {
      this.loadLocationMarkers().then(() => {
        this.renderDriverMap(map);
        return;
      });
     
      
    }

    if(type=='directions')
    {
      this.loadLocationMarkers().then(() => {
        this.renderDrivingMap(map);
        return;
      });
    }
    
    
  }

}
