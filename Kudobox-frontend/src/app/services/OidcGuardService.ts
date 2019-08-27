import { CanActivate } from '@angular/router';
import * as Logger from 'js-logger';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class OidcGuardService implements CanActivate {
    private log = Logger.get('OidcGuardService');

    constructor(private authService: AuthService) {}

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.authService.startLoginAuthentication();
        this.log.info('Route navigation blocked by OidcGuardService');
        return false;
    }
}
