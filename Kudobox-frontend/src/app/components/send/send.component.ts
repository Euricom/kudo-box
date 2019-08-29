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
    public isFormInvalid = false;
    public searchText;
    public sizeList: number;

    userForm: FormGroup;

    public users;

    constructor(private _kudoService: KudoService, private _router: Router, private _notifier: NotifierService) {}

    ngOnInit() {
        this.userForm = new FormGroup({
            email: new FormControl('', Validators.required),
        });
        this.onResize();
        this.users = this._kudoService.getUsersList();
    }

    sendKudo() {
        if (this.userForm.status === 'VALID') {
            let kudo = this._kudoService.kudo;
            kudo.user = this.userForm.value.email;

            this._kudoService.sendKudo(kudo).subscribe(
                data => {
                    this._notifier.notify('success', "You're kudo is successfully sent!");
                },
                err => {
                    throw err;
                },
            );

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
