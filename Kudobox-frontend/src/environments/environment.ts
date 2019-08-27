// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as Logger from 'js-logger';

export const environment = {
    production: false,
    logLevel: Logger.DEBUG,

    authentication: {
        redirectUri: 'http://localhost:4200/auth',
        jwksUri:
            'https://msdneurib2c.b2clogin.com/msdneurib2c.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1_onlineteamscanv2',
        postLogoutRedirectUri: 'http://localhost:666/logout',
        authority: 'https://msdneurib2c.b2clogin.com/msdneurib2c.onmicrosoft.com/v2.0',
        client_id: '762503ad-985b-4915-b4e5-9ff99239205e',
        response_type: 'id_token token',
        scope: 'openid profile https://msdneurib2c.onmicrosoft.com/OnlineTeamScanDevApi/user_impersonation',
        response_mode: 'fragment',
        issuer: 'https://msdneurib2c.b2clogin.com/9906da13-6cc7-4433-b327-dc1d40e77748/v2.0/',
        end_session_endpoint:
            'https://msdneurib2c.b2clogin.com/msdneurib2c.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1_onlineteamscanv2',
        authorization_endpoint:
            'https://msdneurib2c.b2clogin.com/msdneurib2c.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_onlineteamscanv2',
        userinfo_endpoint: 'https://graph.microsoft.com/oidc/userinfo',
        filterProtocolClaims: true,
        loadUserInfo: false,
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
