// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD_RjZlwiXznVUhNZ2JlqZislU6T4ly5P8',
    authDomain: 'running-spreadsheet-ee7b6.firebaseapp.com',
    databaseURL: 'https://running-spreadsheet-ee7b6.firebaseio.com',
    projectId: 'running-spreadsheet-ee7b6',
    storageBucket: 'running-spreadsheet-ee7b6.appspot.com',
    messagingSenderId: '227156919392'
  },
  strava: {
    clientId: 40965,
    redirectUrl: 'http://localhost:4200/welcome',
    url: 'https://www.strava.com'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
