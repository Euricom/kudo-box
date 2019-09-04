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

    canActivate(): boolean | Promise<boolean> {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        return this.authService.startLoginAuthentication().then(() => this.authService.isLoggedIn());
    }
}
