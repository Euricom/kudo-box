import { CanActivate, Router } from '@angular/router';
import * as Logger from 'js-logger';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class OfflineGuardService implements CanActivate {
    private log = Logger.get('OfflineGuardService');

    constructor(private _router: Router) {}

    canActivate(): boolean {
        if (navigator.onLine) {
            return true;
        }
        this._router.navigate(['offline']);
        return false;
    }
}
