import * as Logger from 'js-logger';
import config from './settings.json';

export const environment = {
    logLevel: Logger.DEBUG,
    production: false,
    apiUrl: config.apiUrl,
    oidc: config.oidc,
};
