import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import * as Logger from 'js-logger';
// import html2canvas from 'html2canvas';
import htmlToImage from 'html-to-image';
import { Meta } from '@angular/platform-browser';
import { FacebookService, InitParams } from 'ngx-facebook';

import { Subscription, observable } from 'rxjs';
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
    public image = '../../assets/great_job.png';
    public baseLocation = window.location.origin;
    private log = Logger.get('MyKudosComponent');

    constructor(private _kudoService: KudoService, private meta: Meta, private fb: FacebookService) {
        const initParams: InitParams = {
            appId: '431009970868119',
            xfbml: true,
            version: 'v2.8',
        };
        this.fb.init(initParams);
    }

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

    shareImage(id, kudoId) {
        const divId = `capture-${id}`;
        console.log('share image', divId);
        const node = document.getElementById(divId);
        const serv = this._kudoService;
        htmlToImage
            .toPng(node)
            .then(dataUrl => {
                serv.saveKudoImage(kudoId, { data: dataUrl }).subscribe(() => this.shareToFacebook(kudoId));
            })
            .catch(function(error) {
                console.error('oops, something went wrong!', error);
            });
    }
    shareToFacebook(kudoId) {
        return this.fb
            .ui({
                method: 'share_open_graph',
                action_type: 'og.shares',
                action_properties: JSON.stringify({
                    object: {
                        'og:title': 'THIS is THE title',
                        'og:site_name': 'This IS the SITE name',
                        'og:description': 'this IS the DESCRIPTION',
                        'og:image': `${this.baseLocation}/api/kudo/${kudoId}/getImage`,
                        'og:image:width': '250',
                        'og:image:height': '257',
                        'og:url': `${this.baseLocation}/public-kudo/${kudoId}`,
                    },
                }),
            })
            .then(response => {
                console.log('after fb.ui', response);
            });
    }
}
