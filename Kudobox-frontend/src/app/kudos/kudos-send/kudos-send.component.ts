import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import Logger from 'js-logger';
import { KudoService } from '../../services/kudo.service';

@Component({
    selector: 'kudos-send',
    templateUrl: './kudos-send.component.html',
    styleUrls: ['./kudos-send.component.scss'],
})
export class KudosSendComponent implements OnInit {
    public isFormInvalid = false;
    public searchText;
    public sizeList: number;
    sendKudoSubscription: Subscription;

    userForm: FormGroup;

    public users;

    constructor(private _kudoService: KudoService, private _router: Router, private _notifier: NotifierService) {}

    ngOnInit() {
        this.userForm = new FormGroup({
            user: new FormControl('', Validators.required),
        });
        this.onResize();
        this.users = this._kudoService.getUsersList();
    }

    ngOnDestroy() {
        if (this.sendKudoSubscription) {
            this.sendKudoSubscription.unsubscribe();
        }
    }

    sendKudo() {
        Logger.error("this.userForm.status === 'VALID' :", this.userForm.status === 'VALID');
        if (this.userForm.status === 'VALID') {
            const kudo = this._kudoService.kudo;
            kudo.receiver = this.userForm.value.user;
            Logger.error('sending kudo');
            this.sendKudoSubscription = this._kudoService
                .sendKudo(kudo)
                .pipe()
                .subscribe(
                    () => {
                        this._notifier.notify('success', 'Your kudo is successfully sent!');
                        this._router.navigate([`/kudos/`]);
                    },
                    err => {
                        throw err;
                    },
                );
        } else {
            this.isFormInvalid = true;
        }
    }

    @HostListener('window:resize')
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
