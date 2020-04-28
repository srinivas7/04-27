// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  local: true,
  // geofence: {
  //   create: "/CustomAlerts/geofence/create",
  //   update: "/CustomAlerts/geofence/update",
  //   history: "/CustomAlerts/geofence/get/history",
  //   records: "/CustomAlerts/geofence/get/configuration",
  //   delete: "/CustomAlerts/geofence/delete",
  //   serachPOIUrl: "https://www.mapquestapi.com/search/v3/prediction",
  //   reverseGeoCode: "https://www.mapquestapi.com/geocoding/v1/reverse",
  // },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const BOUNDARY_ALERT_CONFIG = {
  mapkey: 'rEM8JGOqzRhhvxYe51E5S5GzR1UrdW2T',
  serachPOIUrl: 'https://www.mapquestapi.com/search/v3/prediction',
  coordinates: { lat: 40.762527, lng: -73.99578 },
  radius: 3218, // 2miles
  zoomLevel: 12,
  base_color: '#08BFC1',
  min_radius: 0.25,
  max_radius: 100,
  location_search_on_map: true, // based on showing the search in-line or in map
  radius_on_map: false, // Show radius marker on map
  days_to_monitor: true,
  btnControls: {
    zoomCtrl: true,
    currentLocation: false,
    locateVehicle: false,
  },
};
