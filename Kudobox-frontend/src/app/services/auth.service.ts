/* eslint-disable no-undef */
import { Injectable } from '@angular/core';

import { WebStorageStateStore, UserManagerSettings, UserManager, User } from 'oidc-client';
import * as Logger from 'js-logger';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private manager = new UserManager(getClientSettings());
    private log = Logger.get('AuthService');
    public user: User = null;
    user$: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor(private router: Router, private _notifierService: NotifierService) {
        this.manager.getUser().then(user => {
            this.user = user;
            this.setUser();
        });
    }
    setUser(): Observable<User> {
        this.log.info('AuthService.setUser() has been called.');

        if (this.user) {
            this.user$.next(this.user);
        } else {
            this.user$.next(null);
        }
        return this.user$;
    }
    checkUser(): Promise<void> {
        this.log.info('AuthService.checkUser() has been called.');

        return this.manager.getUser().then(user => {
            this.user = user;
        });
    }

    isLoggedIn(): boolean {
        this.log.info('AuthService.isLoggedIn() has been called.');

        return this.user != null && !this.user.expired;
    }

    getClaims(): any {
        this.log.info('AuthService.getClaims() has been called.');

        return this.user.profile;
    }

    getAuthorizationHeaderValue(): string {
        this.log.info('AuthService.getAuthorizationHeaderValue() has been called.');

        if (this.user) {
            return `${this.user.token_type} ${this.user.access_token}`;
        }
        return null;
    }

    startLoginAuthentication(): Promise<void> {
        this.log.info('AuthService.startLoginAuthentication() has been called.');
        return this.manager.signinRedirect({ state: window.location.pathname });
    }

    completeAuthentication(): Promise<void> {
        this.log.info('AuthService.completeAuthentication() has been called.');
        return this.manager
            .signinRedirectCallback()
            .then(user => {
                this.user = user;
                this.setUser();
                this.router.navigateByUrl(this.user.state);
            })
            .catch(err => {
                this.log.error(err);
            });
    }
    startLogout(): Promise<void> {
        this.log.info('AuthService.startLogout() has been called.');

        return this.manager.signoutRedirect();
    }

    completeLogout(): Promise<void> {
        this.log.info('AuthService.completeLogout() has been called.');

        return this.manager
            .signoutRedirectCallback()
            .then(() => {
                this.user = null;
                this.setUser();
            })
            .catch(error => {
                this.log.error(error);
            });
    }
}

export function getClientSettings(): UserManagerSettings {
    return {
        authority: environment.oidc.authority,
        client_id: environment.oidc.client_id,
        redirect_uri: environment.oidc.redirect_uri,
        response_type: environment.oidc.response_type,
        scope: environment.oidc.scope,
        loadUserInfo: environment.oidc.loadUserInfo,
        post_logout_redirect_uri: environment.oidc.post_logout_redirect_uri,
        userStore: new WebStorageStateStore({ store: window.localStorage }),
    };
}
