import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { KudoService } from '../../services/kudo.service';
import { Subscription } from 'rxjs';

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
        this.sendKudoSubscription.unsubscribe();
    }

    sendKudo() {
        if (this.userForm.status === 'VALID') {
            let kudo = this._kudoService.kudo;
            kudo.receiver = this.userForm.value.user;

            this.sendKudoSubscription = this._kudoService.sendKudo(kudo).subscribe(
                () => {
                    this._notifier.notify('success', "You're kudo is successfully sent!");
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
