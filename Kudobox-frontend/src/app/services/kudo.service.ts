import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class KudoService {
    private _imageDataURL: string;
    private _user: string;

    constructor(private http: HttpClient) {}

    set imageDataURL(imageDataURL: string) {
        this._imageDataURL = imageDataURL;
    }

    get imageDataURL(): string {
        return this._imageDataURL;
    }

    set user(user: string) {
        this._user = user;
    }

    get user(): string {
        return this._user;
    }

    sendKudo(kudo) {
        const body = JSON.stringify(kudo);
        return this.http.post('/api/kudo', body).pipe(
            catchError(e => {
                console.log(`error: ${e}`);
                return empty();
            }),
        );
    }
}
