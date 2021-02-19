// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //KeyCloak 설정
  keycloak: {
    issuer : 'http://192.168.0.118:8080/auth/realms/grafana',

    redirectUri: 'http://localhost:4400/app',

    clientId: 'zeus',

    dummyClientSecret: '6ce00618-1360-411e-af35-ad079941c78e',

    responseType: 'code',

    scope: 'email roles',

    requireHttps: false,

    showDebugInformation: true,

    disableAtHashCheck:true
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