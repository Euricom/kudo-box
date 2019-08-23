import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

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
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this._token}`,
            },
        });

        return next.handle(request);
    }

    ngOnDestroy() {
        this.adalServiceSubscription.unsubscribe();
    }
}
