import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Kudo } from '../models/kudo';

@Injectable({
    providedIn: 'root',
})
export class KudoService implements OnInit {
    private _kudo: Kudo;
    private _user: string;
    private _usersList;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this._usersList = this.getUsersList();
    }

    get kudo() {
        return this._kudo;
    }

    set kudo(kudo) {
        this._kudo = kudo;
    }

    set user(user: string) {
        this._user = user;
    }

    get user(): string {
        return this._user;
    }

    get usersList() {
        return this._usersList;
    }

    set usersList(users) {
        this._usersList = users;
    }

    sendKudo(kudo) {
        return this.http.post('/api/kudo', kudo).pipe(
            catchError(e => {
                console.log(`error: ${e}`);
                return throwError('BIGBIG ERROR');
            }),
        );
    }

    getUsersList() {
        return this.http.get('/api/user').pipe(
            catchError(e => {
                console.log(`error:`, e);
                return throwError('BIGBIG ERROR');
            }),
        );
    }

    getMyKudos() {
        return this.http.get('/api/mykudo/').pipe(
            catchError(e => {
                console.log(`error:`, e);
                return throwError('BIGBIG ERROR');
            }),
        );
    }

    getAllKudos() {
        return this.http.get('/api/kudo/').pipe(
            catchError(e => {
                console.log(`error:`, e);
                return throwError('BIGBIG ERROR');
            }),
        );
    }

    getUnreadKudos() {
        console.log('getUnreadKudos');
        return this.http.get('/api/unreadKudos/').pipe(
            catchError(e => {
                console.log(`error:`, e);
                return throwError('BIGBIG ERROR');
            }),
        );
    }

    changeStatus(status: string) {
        console.log('change status');
        return this.http.put('/api/changeStatus/', { status: status }).pipe(
            catchError(e => {
                console.log(`error:`, e);
                return throwError('BIGBIG ERROR');
            }),
        );
    }
}
