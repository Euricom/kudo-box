import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { KudoService } from '../../services/kudo.service';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
    public imageDataURL: string;
    public isFormInvalid = false;
    public searchText;
    public sizeList: number;

    userForm: FormGroup;

    public users: object[] = [
        {
            name: 'Adil Khan',
            firstName: 'Adil',
            lastName: 'Khan',
        },
        {
            name: 'Bart Thoelen',
            firstName: 'Bart',
            lastName: 'Thoelen',
        },
        {
            name: 'Bram Decuypere',
            firstName: 'Bram',
            lastName: 'Decuypere',
        },
        {
            name: 'Claudio Barjas Martinez',
            firstName: 'Claudio Barjas',
            lastName: 'Martinez',
        },
        {
            name: 'Daan Devos',
            firstName: 'Daan',
            lastName: 'Devos',
        },
        {
            name: 'David Vanheeswijck',
            firstName: 'David',
            lastName: 'Vanheeswijck',
        },
        {
            name: 'Dirk Moegh',
            firstName: 'Dirk',
            lastName: 'Moegh',
        },
        {
            name: 'Guy Van den Nieuwenhof',
            firstName: 'Guy',
            lastName: 'Van den Nieuwenhof',
        },
        {
            name: 'Jan Van Hoye',
            firstName: 'Jan',
            lastName: 'Van Hoye',
        },
        {
            name: 'Jari Thiels',
            firstName: 'Jari',
            lastName: 'Thiels',
        },
        {
            name: 'Jelle Oosterbosch',
            firstName: 'Jelle',
            lastName: 'Oosterbosch',
        },
        {
            name: 'Jerome Huyghe',
            firstName: 'Jerome',
            lastName: 'Huyghe',
        },
        {
            name: 'Joeri Druyts',
            firstName: 'Joeri',
            lastName: 'Druyts',
        },
        {
            name: 'Jonas Van Eeckhout',
            firstName: 'Jonas',
            lastName: 'Van Eeckhout',
        },
        {
            name: 'Jonas Vercammen',
            firstName: 'Jonas',
            lastName: 'Vercammen',
        },
        {
            name: 'Jordy Rymenants',
            firstName: 'Jordy',
            lastName: 'Rymenants',
        },
        {
            name: 'Joris Compernol',
            firstName: 'Joris',
            lastName: 'Compernol',
        },
        {
            name: 'Karima El Hachimi',
            firstName: 'Karima',
            lastName: 'El hachimi',
        },
        {
            name: 'Kenneth Lenaerts',
            firstName: 'Kenneth',
            lastName: 'Lenaerts',
        },
    ];

    constructor(private _kudoService: KudoService, private _router: Router, private _notifier: NotifierService) {}

    ngOnInit() {
        this.imageDataURL = this._kudoService.imageDataURL;
        this.userForm = new FormGroup({
            userName: new FormControl('', Validators.required),
        });
        this.onResize();
    }

    sendKudo() {
        if (this.userForm.status === 'VALID') {
            const kudo = {
                image: this.imageDataURL,
                user: this.userForm.value.userName,
            };
            this._kudoService.sendKudo(kudo).subscribe();

            this._notifier.notify('success', "You're kudo is successfully sent!");

            this._router.navigate([`/kudo/`]);
        } else {
            this.isFormInvalid = true;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (window.innerHeight < 400) {
            this.sizeList = 5;
        } else if (window.innerWidth < 600) {
            this.sizeList = 13;
        } else if (window.innerWidth >= 600) {
            this.sizeList = 20;
        }
    }
}
