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
        response_type:environment.oidc.response_type,
        scope: environment.oidc.scope,
        loadUserInfo: environment.oidc.loadUserInfo,
        metadata: {
            authorization_endpoint:
                environment.oidc.metadata.authorization_endpoint,
            token_endpoint: environment.oidc.metadata.token_endpoint,
            token_endpoint_auth_methods_supported: environment.oidc.metadata.token_endpoint_auth_methods_supported,
            jwks_uri: environment.oidc.metadata.jwks_uri,
            response_modes_supported: environment.oidc.metadata.response_modes_supported,
            subject_types_supported: environment.oidc.metadata.subject_types_supported,
            id_token_signing_alg_values_supported: environment.oidc.metadata.id_token_signing_alg_values_supported,
            http_logout_supported: environment.oidc.metadata.http_logout_supported,
            frontchannel_logout_supported: environment.oidc.metadata.frontchannel_logout_supported,
            end_session_endpoint:
                environment.oidc.metadata.end_session_endpoint,
            response_types_supported: environment.oidc.metadata.response_types_supported,
            scopes_supported: environment.oidc.metadata.scopes_supported,
            issuer: environment.oidc.metadata.issuer,
            claims_supported: environment.oidc.metadata.claims_supported,
            request_uri_parameter_supported: environment.oidc.metadata.request_uri_parameter_supported,
            userinfo_endpoint: environment.oidc.metadata.userinfo_endpoint,
            tenant_region_scope: environment.oidc.metadata.tenant_region_scope,
            cloud_instance_name: environment.oidc.metadata.cloud_instance_name,
            cloud_graph_host_name: environment.oidc.metadata.cloud_graph_host_name,
            msgraph_host: environment.oidc.metadata.msgraph_host,
            rbac_url: environment.oidc.metadata.rbac_url,
        },
        post_logout_redirect_uri: environment.oidc.post_logout_redirect_uri,
        // silent_redirect_uri: 'http://localhost:4200/renew-callback.html',
        // accessTokenExpiringNotificationTime: 10,
        // automaticSilentRenew: true,
        // eslint-disable-next-line no-undef
        userStore: new WebStorageStateStore({ store: window.localStorage }),

        signingKeys: environment.oidc.signingKeys
    };
}
