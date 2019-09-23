import { Injectable } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { User } from '../models/user';
@Injectable({
    providedIn: 'root',
})
export class IndexedDbService {
    private db = new NgxIndexedDB('kudoBox', 1);
    constructor() {
        this.db.openDatabase(1, evt => {
            const objectStore = evt.currentTarget.result.createObjectStore('users', {
                keyPath: '_id',
            });
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
        });
        this.db.openDatabase(1, evt => {
            const objectStore = evt.currentTarget.result.createObjectStore('user', {
                keyPath: '_id',
            });
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
        });
    }

    getUsers(): Promise<User[]> {
        return this.db.getAll('users').then(users => users.map(u => Object.assign(new User(), u)));
    }
    saveUsers(users: User[]) {
        users.forEach(user => {
            this.db.update('users', user);
        });
    }
    saveUser(user: User) {
        this.db.add('User', user);
    }
}
