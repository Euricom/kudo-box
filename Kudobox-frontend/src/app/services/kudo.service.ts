import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, empty, Observable, fromEvent, of } from 'rxjs';
import { environment } from 'src/environments/environment';
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
        return this.http.post(`${environment.apiUrl}/api/kudo/batch`, kudos).pipe(
            tap(() => localStorage.removeItem('offlineKudos')),
            catchError(e => {
                console.log(`error10: ${e}`);
                return throwError('BIGBIG ERROR');
            }),
        );
    }

    sendKudo(kudo) {
        if (navigator.onLine) {
            return this.http.post(`${environment.apiUrl}/api/kudo`, kudo).pipe(
                catchError(e => {
                    console.log(`error9: ${e}`);
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
        console.log('HALLO');
        console.log('getuserslist', navigator.onLine);
        if (navigator.onLine) {
            return this.http.get(`${environment.apiUrl}/api/user`).pipe(
                tap(users => {
                    localStorage.setItem('users', JSON.stringify(users));
                }),
                catchError(e => {
                    console.log(`error1:`, e);
                    return throwError('BIGBIG ERROR');
                }),
            );
        }
        return of(JSON.parse(localStorage.getItem('users')));
    }

    getMyKudos() {
        return this.http.get(`${environment.apiUrl}/api/mykudo/`).pipe(
            tap(myKudos => localStorage.setItem('myKudos', JSON.stringify(myKudos))),
            catchError(e => {
                console.log(`error2:`, e);
                return throwError(e.statusText);
            }),
        );
    }

    getAllKudos() {
        if (navigator.onLine) {
            return this.http.get(`${environment.apiUrl}/api/kudo/`).pipe(
                catchError(e => {
                    console.log(`error3:`, e);
                    return throwError(e.statusText);
                }),
            );
        } else {
            return of({});
        }
    }

    getUnreadKudos() {
        console.log('getUnreadKudos');
        if (navigator.onLine) {
            return this.http.get(`${environment.apiUrl}/api/unreadKudos/`).pipe(
                catchError(e => {
                    console.log(`error4:`, e);
                    return throwError(e.statusText);
                }),
            );
        } else {
            return of(0);
        }
    }

    changeStatus(status: string) {
        console.log('change status');
        return this.http.put(`${environment.apiUrl}/api/changeStatus/`, { status }).pipe(
            catchError(e => {
                console.log(`error5:`, e);
                return throwError(e.statusText);
            }),
        );
    }
}
