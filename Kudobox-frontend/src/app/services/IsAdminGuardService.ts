import { CanActivate } from '@angular/router';
import * as Logger from 'js-logger';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { KudoService } from './kudo.service';
@Injectable({
    providedIn: 'root',
})
export class IsAdminGuardService implements CanActivate, OnInit {
    private log = Logger.get('IsAdminGuardService');
    private user;
    constructor(private authService: AuthService, private kudoService: KudoService) {}
    ngOnInit() {}

    canActivate(): boolean | Promise<boolean> {
        if (navigator.onLine) {
            if (this.authService.isLoggedIn()) {
                return this.authService.mongoUser.admin === true;
            }
            return this.authService.startLoginAuthentication().then(() => this.authService.isLoggedIn());
        }
        if (!navigator.onLine) {
            return true;
        }
        return false;
    }
}
