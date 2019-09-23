import { Injectable } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
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
            console.error(
                'IndexedDB is not aviable for your browser. Please check the browser support for this feature: http://caniuse.com/#feat=indexeddb',
            );
        }
    }

    getDb() {
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
        return this.getDb().then(() =>
            this.db.getAll('users').then(users => users.map(u => Object.assign(new User(), u))),
        );
    }
    saveUsers(users: User[]) {
        return this.getDb().then(() =>
            users.forEach(user => {
                this.db.update('users', user);
            }),
        );
    }

    getUser() {
        return this.getDb().then(() =>
            this.db.getAll('user').then(users => users[0].map(u => Object.assign(new User(), u))),
        );
    }
    saveUser(user: User) {
        return this.getDb().then(() => this.db.add('user', user));
    }

    saveKudo(kudo) {
        return this.getDb().then(() => this.db.add('kudos', kudo));
    }
    getKudos() {
        return this.getDb().then(() => this.db.getAll('kudos'));
    }
    removeAllKudos() {
        return this.getDb().then(() => this.db.clear('kudos'));
    }
}
