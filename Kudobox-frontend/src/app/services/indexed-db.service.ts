import { Injectable } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import * as Logger from 'js-logger';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class IndexedDbService {
    private db = new NgxIndexedDB('kudoBox', 1);
    constructor() {
        if (window.indexedDB) {
            this.getDb();
        } else {
            Logger.error(
                'IndexedDB is not aviable for your browser. Please check the browser support for this feature: http://caniuse.com/#feat=indexeddb',
            );
        }
    }

    getDb() {
        Logger.error('getDb');
        return this.db.openDatabase(1, evt => {
            const objectStoreUsers = evt.currentTarget.result.createObjectStore('users', {
                keyPath: '_id',
            });
            objectStoreUsers.createIndex('name', 'name', { unique: false });
            objectStoreUsers.createIndex('email', 'email', { unique: true });

            const objectStoreUser = evt.currentTarget.result.createObjectStore('user', {
                keyPath: '_id',
            });
            objectStoreUser.createIndex('name', 'name', { unique: false });
            objectStoreUser.createIndex('email', 'email', { unique: true });

            const objectStoreKudos = evt.currentTarget.result.createObjectStore('kudos', {
                keyPath: '_id',
                autoIncrement: true,
            });
            objectStoreKudos.createIndex('createdOn', 'createdOn', { unique: false });
        });
    }

    getUsers(): Promise<User[]> {
        Logger.error('getusers');
        return this.getDb().then(() =>
            this.db.getAll('users').then(users => users.map(u => Object.assign(new User(), u))),
        );
    }
    saveUsers(users: User[]) {
        Logger.error('saveUsers0');
        return this.getDb().then(() =>
            users.forEach(user => {
                this.db.update('users', user);
            }),
        );
    }

    getUser() {
        Logger.error('getUser');
        return this.getDb().then(() =>
            this.db.getAll('user').then(users => users[0].map(u => Object.assign(new User(), u))),
        );
    }
    saveUser(user: User) {
        Logger.error('saveUser');

        return this.getDb().then(() => this.db.add('user', user));
    }

    saveKudo(kudo) {
        Logger.error('saveKudo');

        return this.getDb().then(() => this.db.add('kudos', kudo));
    }
    getKudos() {
        Logger.error('getKudo');

        return this.getDb().then(() => this.db.getAll('kudos'));
    }
    removeAllKudos() {
        Logger.error('removeAllKudo');

        return this.getDb().then(() => this.db.clear('kudos'));
    }
}
