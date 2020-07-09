// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBQoSzIt2SIZAZJoF4Zw1j96xTNC46vZu8",
    authDomain: "feedme-angular.firebaseapp.com",
    databaseURL: "https://feedme-angular.firebaseio.com",
    projectId: "feedme-angular",
    storageBucket: "feedme-angular.appspot.com",
    messagingSenderId: "501130974425",
    appId: "1:501130974425:web:fbd7c6b30f95e394c85ac8",
    measurementId: "G-L90ES30YPQ"
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoiZmVlZG1ld2ViYXBwIiwiYSI6ImNrYnY1czVxdzAwNmQzMGxieTU4MnZraWEifQ.NQrq1y608FyGnM3Z7nmghg'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
