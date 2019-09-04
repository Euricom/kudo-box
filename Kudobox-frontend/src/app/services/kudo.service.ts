import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, empty, Observable, fromEvent, of } from 'rxjs';
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
        return JSON.parse(localStorage.getItem('newKudo'));
    }

    set kudo(kudo) {
        this._kudo = kudo;
        localStorage.setItem('newKudo', JSON.stringify(this._kudo));
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

    syncKudos() {
        const kudos = JSON.parse(localStorage.getItem('offlineKudos'));
        if (kudos) {
            return this.sendKudos(kudos);
        }
        return of({});
    }

    sendKudos(kudos) {
        return this.http.post('/api/kudo/batch', kudos).pipe(
            tap(() => localStorage.removeItem('offlineKudos')),
            catchError(e => {
                console.log(`error: ${e}`);
                return throwError('BIGBIG ERROR');
            }),
        );
    }

    sendKudo(kudo) {
        if (navigator.onLine) {
            return this.http.post('/api/kudo', kudo).pipe(
                catchError(e => {
                    console.log(`error: ${e}`);
                    return throwError('BIGBIG ERROR');
                }),
            );
        }
        this.saveKudo(kudo);
        return of({});
    }

    saveKudo(kudo) {
        const kudos = JSON.parse(localStorage.getItem('offlineKudos')) || [];
        kudos.push(kudo);
        localStorage.setItem('offlineKudos', JSON.stringify(kudos));
    }

    getUsersList() {
        if (navigator.onLine) {
            return this.http.get('/api/user').pipe(
                tap(users => {
                    localStorage.setItem('users', JSON.stringify(users));
                }),
                catchError(e => {
                    console.log(`error:`, e);
                    return throwError('BIGBIG ERROR');
                }),
            );
        }
        return of(JSON.parse(localStorage.getItem('users')));
    }

    getMyKudos() {
        return this.http.get('/api/mykudo/').pipe(
            tap(myKudos => localStorage.setItem('myKudos', JSON.stringify(myKudos))),
            catchError(e => {
                console.log(`error:`, e);
                return throwError(e.statusText);
            }),
        );
    }

    getAllKudos() {
        return this.http.get('/api/kudo/').pipe(
            catchError(e => {
                console.log(`error:`, e);
                return throwError(e.statusText);
            }),
        );
    }

    getUnreadKudos() {
        console.log('getUnreadKudos');
        return this.http.get('/api/unreadKudos/').pipe(
            catchError(e => {
                console.log(`error:`, e);
                return throwError(e.statusText);
            }),
        );
    }

    changeStatus(status: string) {
        console.log('change status');
        return this.http.put('/api/changeStatus/', { status }).pipe(
            catchError(e => {
                console.log(`error:`, e);
                return throwError(e.statusText);
            }),
        );
    }
}
