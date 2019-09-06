import * as Logger from 'js-logger';

export const environment = {
    logLevel: Logger.DEBUG,
    production: true,
    apiUrl: '#{apiUrl}#',
    oidc: {
        authority: 'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/v2.0/',
        scope: 'openid profile api://kudobox.euri.com/api',
        redirect_uri: '#{redirect_uri}#',
        response_type: 'id_token token',
        client_id: 'de411acd-f5d7-4040-8da6-3d3adce56901',
        loadUserInfo: false,
        post_logout_redirect_uri: '#{post_logout_redirect_uri}#',
    },
};
