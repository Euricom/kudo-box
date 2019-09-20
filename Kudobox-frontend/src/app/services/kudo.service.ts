import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, Observable, of, from } from 'rxjs';
import * as Logger from 'js-logger';

import { environment } from 'src/environments/environment';
import { Kudo } from '../models/kudo';
import { User } from '../models/user';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class KudoService implements OnInit {
    private _kudo: Kudo;
    private log = Logger.get('KudoService');

    constructor(private http: HttpClient, private _indexedDbService: IndexedDbService) {}

    ngOnInit() {}

    get kudo() {
        return JSON.parse(localStorage.getItem('newKudo'));
    }

    set kudo(kudo) {
        this._kudo = kudo;
        localStorage.setItem('newKudo', JSON.stringify(this._kudo));
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
                this.log.error('Error sendKudos():', e);
                return throwError(e);
            }),
        );
    }

    sendKudo(kudo) {
        if (navigator.onLine) {
            return this.http.post(`${environment.apiUrl}/api/kudo`, kudo).pipe(
                catchError(e => {
                    this.log.error('Error sendKudo():', e);
                    return throwError(e);
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

    saveKudoImage(kudoId, image) {
        return this.http.post(`${environment.apiUrl}/api/kudo/${kudoId}/saveImage`, image).pipe(
            catchError(e => {
                this.log.error('Error sendKudo():', e);
                return throwError(e);
            }),
        );
    }

    getUsersList(): Observable<User[]> {
        if (navigator.onLine) {
            return this.http.get<User[]>(`${environment.apiUrl}/api/user`).pipe(
                tap(data => {
                    const users = data.map(u => Object.assign(new User(), u));
                    this.log.info('Users are saved');
                    // localStorage.setItem('users', JSON.stringify(users));
                    this._indexedDbService.saveUsers(users);

                    return from(this._indexedDbService.getUsers());
                }),
                catchError(e => {
                    this.log.error('Error getUsersList():', e);
                    return throwError(e);
                }),
            );
        }
        return from(this._indexedDbService.getUsers());
    }

    getMyKudos(): Observable<Kudo[]> {
        return this.http.get<Kudo[]>(`${environment.apiUrl}/api/mykudo/`).pipe(
            tap(myKudos => localStorage.setItem('myKudos', JSON.stringify(myKudos))),
            catchError(e => {
                this.log.error('Error getMyKudos():', e);
                return throwError(e);
            }),
        );
    }

    getPublicKudo(id): Observable<Kudo> {
        return this.http.get<Kudo>(`${environment.apiUrl}/api/publicKudo/${id}`).pipe(
            map(kudo => Object.assign(new Kudo(), kudo)),
            catchError(e => {
                this.log.error('Error getPublicKudo():', e);
                return throwError(e);
            }),
        );
    }

    getAllKudos(skip): Observable<Kudo[]> {
        if (navigator.onLine) {
            return this.http.get<Kudo[]>(`${environment.apiUrl}/api/kudo?skip=${skip}`).pipe(
                catchError(e => {
                    this.log.error('Error getAllKudos():', e);
                    return throwError(e);
                }),
            );
        }
        return of([]);
    }

    getUnreadKudos(): Observable<number> {
        if (navigator.onLine) {
            return this.http.get<number>(`${environment.apiUrl}/api/unreadKudos/`).pipe(
                catchError(e => {
                    this.log.error('Error getUnreadKudos():', e);
                    return throwError(e);
                }),
            );
        }
        return of(0);
    }

    changeStatus(status: string) {
        return this.http.put(`${environment.apiUrl}/api/changeStatus/`, { status }).pipe(
            catchError(e => {
                this.log.error('Error changeStatus():', e);
                return throwError(e);
            }),
        );
    }
}
