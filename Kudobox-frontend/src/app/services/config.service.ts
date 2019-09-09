import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Declaration of config class
 */
export class AppConfig {
    //Your properties here
    readonly apiUrl: string;
    readonly authority: string;
    readonly scope: string;
    readonly redirect_uri: string;
    readonly response_type: string;
    readonly client_id: string;
    readonly loadUserInfo: boolean;
    readonly post_logout_redirect_uri: string;
}

/**
 * Global variable containing actual config to use. Initialised via ajax call
 */
export let APP_CONFIG: AppConfig;

/**
 * Service in charge of dynamically initialising configuration
 */
@Injectable()
export class AppConfigService {
    constructor(private http: HttpClient) {}

    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('../../assets/config/config.json').subscribe((envResponse: any) => {
                let t = new AppConfig();
                //Modify envResponse here if needed (e.g. to ajust parameters for https,...)
                APP_CONFIG = Object.assign(t, envResponse);
                resolve(true);
            });
        });
    }
}

export const ConfigServiceProvider = {  
  provide: AppConfigService,
  useFactory: AppConfigService,
  deps: [],
};