// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    azure: {
        tenantID: '0b53d2c1-bc55-4ab3-a161-927d289257f2',
        clientID: 'de411acd-f5d7-4040-8da6-3d3adce56901',
        redirectUri: 'http://localhost:4200/auth',
        endpoints: {},
        navigateToLoginRequestUri: false,
        cacheLocation: 'localStorage',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
