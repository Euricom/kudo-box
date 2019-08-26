import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    adalServiceSubscription: Subscription;

    private _token: string;
    constructor(private _adalService: MsAdalAngular6Service) {
        this.adalServiceSubscription = this._adalService.acquireToken('<RESOURCE>').subscribe((resToken: string) => {
            this._token = resToken;
        });
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // request = request.clone({
        //     setHeaders: {
        //         Authorization: `Bearer ${this._token}`,
        //     },
        // });
        const resource = this._adalService.GetResourceForEndpoint(request.url);
        if (!resource || !this._adalService.isAuthenticated) {
            return next.handle(request);
        }

        // merge the bearer token into the existing headers
        return this._adalService.acquireToken(resource).pipe(
            mergeMap((token: string) => {
                const authorizedRequest = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${token}`),
                });
                return next.handle(authorizedRequest);
            }),
        );
    }

    ngOnDestroy() {
        this.adalServiceSubscription.unsubscribe();
    }
}
