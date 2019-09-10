import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import * as Logger from 'js-logger';
import html2canvas from 'html2canvas';

import { Subscription } from 'rxjs';
import { KudoService } from '../services/kudo.service';
import { kudoImages } from '../data/kudoImages.js';

@Component({
    selector: 'app-my-kudos',
    templateUrl: './my-kudos.component.html',
    styleUrls: ['./my-kudos.component.scss'],
})
export class MyKudosComponent implements OnInit {
    public kudos;
    public kudoImages;
    myKudosSubscription: Subscription;
    changeStatusSubscription: Subscription;
    public image = 'https://google.com';
    public baseLocation = window.location.origin;
    private log = Logger.get('MyKudosComponent');

    constructor(private _kudoService: KudoService) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.myKudosSubscription = this._kudoService.getMyKudos().subscribe(data => {
            this.kudos = data;
            this.changeStatusSubscription = this._kudoService.changeStatus('read').subscribe(() => {
                this.log.info('Kudos are updated.');
            });
        });
    }

    ngOnDestroy() {
        this.myKudosSubscription.unsubscribe();
        this.changeStatusSubscription.unsubscribe();
    }

    getKudoImage(id: number) {
        const image = this.kudoImages.filter(kudo => {
            if (kudo.id === id) {
                return kudo.url;
            }
            return false;
        });
        return image[0].url;
    }

    shareImage() {
        console.log('share image');
        /*html2canvas(document.querySelector('#capture'), { backgroundColor: '#6d6e72' }).then(canvas => {
            document.body.appendChild(canvas);
            console.log('CANVAS', canvas.toDataURL());
        });*/

        html2canvas(document.querySelector('#capture'), {
            allowTaint: true,
        }).then(canvas => {
            document.body.appendChild(canvas);
        });
    }
}
