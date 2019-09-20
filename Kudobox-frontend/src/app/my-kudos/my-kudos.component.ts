import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import * as Logger from 'js-logger';
// import html2canvas from 'html2canvas';
import htmlToImage from 'html-to-image';
import { Meta } from '@angular/platform-browser';

import { Subscription, observable } from 'rxjs';
import { Router } from '@angular/router';
import { KudoService } from '../services/kudo.service';
// eslint-disable-next-line import/extensions
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
    private log = Logger.get('MyKudosComponent');

    constructor(private _kudoService: KudoService, private meta: Meta, private router: Router) {}

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
        return {
          url: image[0].url,
          title: image[0].title};
    }

    shareImage(id, kudoId) {
        const divId = `capture-${id}`;
        const node = document.getElementById(divId);
        const serv = this._kudoService;
        this.htmlToPng(node).then(dataUrl => {
            serv.saveKudoImage(kudoId, { data: dataUrl }).subscribe(() =>
                this.router.navigateByUrl(`/share-kudo/${kudoId}`),
            );
        });
    }

    htmlToPng(node) {
        return htmlToImage
            .toPng(node)
            .then(dataUrl => {
                return dataUrl;
            })
            .catch(function(error) {
                console.error('oops, something went wrong!', error);
            });
    }

    convertDataURIToBinary(dataUrl) {
        var base64Index = dataUrl.indexOf(';base64,') + ';base64,'.length;
        var base64 = dataUrl.substring(base64Index);
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    downloadImage(id) {
        const divId = `capture-${id}`;
        const node = document.getElementById(divId);
        const serv = this._kudoService;
        this.htmlToPng(node).then(dataUrl => {
            this.downloadImages(dataUrl);
        });
    }

    downloadImages(image) {
        const binaryData = this.convertDataURIToBinary(image);
        var url = window.URL.createObjectURL(new Blob([binaryData], { type: 'image/png' }));
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'test';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
    }
}
