import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

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

    private readonly _notifier: NotifierService;

    constructor(private _kudoService: KudoService, private _router: Router, private _notifierService: NotifierService) {
        this._notifier = _notifierService;
    }

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

        this._notifier.notify('success', "You're kudo is successfully sent!");

        this._router.navigate([`/kudo/`]);
    }
}
