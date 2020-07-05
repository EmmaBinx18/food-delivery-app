import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import * as mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from 'mapbox-gl-geocoder'
import { AddressService } from './address.service';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  lat = 45.899977;
  lng = 6.172652;
  style = 'mapbox://styles/mapbox/streets-v11';
  zoom = 2;
  minzoom = 10;
  address: any
  marker: any

  constructor(public addressService: AddressService, public userService: UserService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMarkers() {
    var customData = {
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'title': 'Lincoln Park',
            'description':
              'A northside park that is home to the Lincoln Park Zoo'
          },
          'geometry': {
            'coordinates': [-87.637596, 41.940403],
            'type': 'Point'
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'Burnham Park',
            'description': "A lakefront park on Chicago's south side"
          },
          'geometry': {
            'coordinates': [-87.603735, 41.829985],
            'type': 'Point'
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'Millennium Park',
            'description':
              'A downtown park known for its art installations and unique architecture'
          },
          'geometry': {
            'coordinates': [-87.622554, 41.882534],
            'type': 'Point'
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'Grant Park',
            'description':
              "A downtown park that is the site of many of Chicago's favorite festivals and events"
          },
          'geometry': {
            'coordinates': [-87.619185, 41.876367],
            'type': 'Point'
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'Humboldt Park',
            'description': "A large park on Chicago's northwest side"
          },
          'geometry': {
            'coordinates': [-87.70199, 41.905423],
            'type': 'Point'
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'Douglas Park',
            'description':
              "A large park near in Chicago's North Lawndale neighborhood"
          },
          'geometry': {
            'coordinates': [-87.699329, 41.860092],
            'type': 'Point'
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'Calumet Park',
            'description':
              'A park on the Illinois-Indiana border featuring a historic fieldhouse'
          },
          'geometry': {
            'coordinates': [-87.530221, 41.715515],
            'type': 'Point'
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'Jackson Park',
            'description':
              "A lakeside park that was the site of the 1893 World's Fair"
          },
          'geometry': {
            'coordinates': [-87.580389, 41.783185],
            'type': 'Point'
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'Columbus Park',
            'description':
              "A large park in Chicago's Austin neighborhood"
          },
          'geometry': {
            'coordinates': [-87.769775, 41.873683],
            'type': 'Point'
          }
        }
      ],
      'type': 'FeatureCollection'
    };

    return customData;
  }

  buildMap(map: mapboxgl.Map, type?: string) {
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
      // trackUserLocation: true

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
      console.log('calling map.onload');

      map.addSource('single-point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      });
      // map.addLayer({
      //   id: 'point',
      //   source: 'single-point',
      //   type: 'circle',
      //   paint: {
      //     'circle-radius': 10,
      //     'circle-color': '#448ee4'
      //   }
      // });

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

        console.log(this.address)
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


    if (type) return;
    var radius = 20;





  }
}
