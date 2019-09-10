import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import * as Logger from 'js-logger';
// import html2canvas from 'html2canvas';
import htmlToImage from 'html-to-image';
import { Meta } from '@angular/platform-browser';

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

    constructor(private _kudoService: KudoService,private meta: Meta) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.myKudosSubscription = this._kudoService.getMyKudos().subscribe(data => {
            this.kudos = data;
            this.changeStatusSubscription = this._kudoService.changeStatus('read').subscribe(() => {
                this.log.info('Kudos are updated.');
            });
        });
        this.meta.addTag({ name: 'image', content: 'https://kudobox-api-dev.azurewebsites.net/api/kudo/5d76381bebbf3a0021481fa6/getImage' });
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
            .then(function(dataUrl) {
                const img = new Image();
                img.src = dataUrl;
                console.log('dataUrl', dataUrl);
                document.body.appendChild(img);

                console.log('test', window.btoa(dataUrl));

                const byteString = window.atob(window.btoa(dataUrl));
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const int8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < byteString.length; i++) {
                    int8Array[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([int8Array], { type: 'image/png' });
                serv.saveKudoImage(kudoId, { data: dataUrl }).subscribe();
                const imageFile = new File([blob], 'sharedImage.png', { type: 'image/png' });
                console.log('imageFile', imageFile);
            })
            .catch(function(error) {
                console.error('oops, something went wrong!', error);
            });

        /* html2canvas(document.querySelector('#capture'), { backgroundColor: '#6d6e72' }).then(canvas => {
            document.body.appendChild(canvas);
            console.log('CANVAS', canvas.toDataURL());
        }); */

        /* html2canvas(document.querySelector('#capture'), {
            allowTaint: true,
        }).then(canvas => {
            document.body.appendChild(canvas);
        }); */
    }
}
