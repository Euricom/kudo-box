import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { KudoService } from '../../shared/kudo.service';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
    public imageDataURL: string;
    public user: string;

    public users: string[] = [
        'Adil Khan',
        'Bart Thoelen',
        'Bram Decuypere',
        'Claudio Barjas Martinez',
        'Daan Devos',
        'David Vanheeswijck',
        'Dirk Moegh',
        'Guy Van den Nieuwenhof',
        'Jan Van Hoye',
        'Jari Thiels',
        'Jelle Oosterbosch',
        'Jerome Huyghe',
        'Joeri Druyts',
        'Jonas Van Eeckhout',
        'Jonas Vercammen',
        'Jordy Rymenants',
        'Joris Compernol',
        'Karima El Hachimi',
        'Kenneth Lenaerts',
    ];

    constructor(private _kudoService: KudoService, private router: Router) {}

    ngOnInit() {
        this.imageDataURL = this._kudoService.imageDataURL;
    }

    onChange(user) {
        this.user = user;
    }

    sendKudo() {
        const kudo = {
            image: this.imageDataURL,
            user: this.user,
        };
        this._kudoService.sendKudo(kudo);

        this.router.navigate([`/kudo/`]);
    }
}
