import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    // intercept(req: HttpRequest<any>, next: HttpHandler) {
    //     const authToken = this.authService.getAuthorizationHeaderValue();
    //     if (authToken) {
    //         const authReq = req.clone({
    //             headers: req.headers.set('Authorization', authToken),
    //         });

    //         return next.handle(authReq);
    //     }

    //     return next.handle(req);
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authToken = this.authService.getAuthorizationHeaderValue();
        if (!authToken) {
            this.authService.startLoginAuthentication().then(() => {
                if (this.authService.isLoggedIn()) {
                    authToken = this.authService.getAuthorizationHeaderValue();
                    const authReq = req.clone({
                        headers: req.headers.set('Authorization', authToken),
                    });
                    return next.handle(authReq);
                }
                return next.handle(req);
            });
        }
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken),
        });
        return next.handle(authReq);
    }
}
