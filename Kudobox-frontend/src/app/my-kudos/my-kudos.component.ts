import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import * as Logger from 'js-logger';
// import html2canvas from 'html2canvas';
import htmlToImage from 'html-to-image';
import { Meta } from '@angular/platform-browser';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import { Subscription, observable } from 'rxjs';
import { Router } from '@angular/router';
import { KudoService } from '../services/kudo.service';
// eslint-disable-next-line import/extensions
import { kudoImages } from '../data/kudoImages.js';

export interface KudoSelection {
    id: number;
    kudoId: number;
}
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
    private log = Logger.get('MyKudosComponent');
    public faSquare = faSquare;
    public faCheckSquare = faCheckSquare;
    public selection: KudoSelection[] = [];

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
        return image[0].url;
    }

    shareImage(id, kudoId) {
        const serv = this._kudoService;
        this.htmlToPng(id).then(dataUrl => {
            serv.saveKudoImage(kudoId, { data: dataUrl }).subscribe(() =>
                this.router.navigateByUrl(`/share-kudo/${kudoId}`),
            );
        });
    }

    htmlToPng(id) {
        const divId = `capture-${id}`;
        const node = document.getElementById(divId);
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
        const base64Index = dataUrl.indexOf(';base64,') + ';base64,'.length;
        const base64 = dataUrl.substring(base64Index);
        const raw = window.atob(base64);
        const rawLength = raw.length;
        const array = new Uint8Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    downloadImages(index, kudoId) {
        const serv = this._kudoService;
        if (index !== '') {
            this.htmlToPng(index).then(dataUrl => {
                this.downloadImage(dataUrl, kudoId);
            });
        } else {
            this.selection.forEach(kudoImage => {
                this.htmlToPng(kudoImage.id).then(dataUrl => {
                    this.downloadImage(dataUrl, kudoImage.kudoId);
                });
            });
        }
    }

    downloadImage(image, id) {
        const binaryData = this.convertDataURIToBinary(image);
        const url = window.URL.createObjectURL(new Blob([binaryData], { type: 'image/png' }));

        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = `Kudo_${id}`;
        a.target = '_blank';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
    }

    isSelected(kudoId) {
        return this.selection.findIndex(s => s.kudoId === kudoId) > -1;
    }

    addImageToSelection(id, kudoId) {
        const index = this.selection.findIndex(s => s.kudoId === kudoId);
        if (index === -1) {
            this.selection.push(<KudoSelection>{ id, kudoId });
        } else {
            this.selection.splice(index, 1);
        }
    }
}
