import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import * as Logger from 'js-logger';
// import html2canvas from 'html2canvas';
import htmlToImage from 'html-to-image';
import { Meta } from '@angular/platform-browser';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { saveAs } from 'file-saver';

import { Subscription, observable, EMPTY, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { mergeMap, map, finalize } from 'rxjs/operators';
import { KudoService } from '../services/kudo.service';
// eslint-disable-next-line import/extensions
import { kudoImages } from '../data/kudoImages';
import { KudoImage } from '../models/kudoImage';
import { Kudo } from '../models/kudo';

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
    myKudosSubscription: Subscription;
    changeStatusSubscription: Subscription;

    private changeStatus$: Subject<any> = new Subject();
    private log = Logger.get('MyKudosComponent');
    public kudoImages: KudoImage[];
    public kudos$: Observable<Kudo[]> = this._kudoService.getMyKudos();
    public faSquare = faSquare;
    public faCheckSquare = faCheckSquare;
    public selection: KudoSelection[] = [];

    constructor(private _kudoService: KudoService, private router: Router) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.myKudosSubscription = this.kudos$
            .pipe(finalize(() => this.changeStatus$.next(EMPTY)))
            .subscribe(() => console.log('kudos'));

        this.changeStatusSubscription = this.changeStatus$
            .pipe(mergeMap(() => this._kudoService.changeStatus('read')))
            .subscribe(() => {
                this.log.info('Kudos are updated.');
            });
    }

    ngOnDestroy() {
        if (this.myKudosSubscription) {
            this.myKudosSubscription.unsubscribe();
        }
        if (this.changeStatusSubscription) {
            this.changeStatusSubscription.unsubscribe();
        }
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

    htmlToPng(id): Promise<string> {
        const divId = `capture-${id}`;
        const node = document.getElementById(divId);
        return htmlToImage
            .toPng(node)
            .then(stringUrl => {
                return stringUrl;
            })
            .catch(function(error) {
                console.error('oops, something went wrong!', error);
                throw error;
            });
    }

    convertDataURIToBinary(dataUrl): Uint8Array {
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
            this.htmlToPng(index).then(stringUrl => {
                // this.downloadImage(dataUrl, kudoId);
                saveAs(this.createBlob(stringUrl), `Kudo_${kudoId}.png`, { autoBom: true });
            });
        } else {
            this.selection.forEach(kudoImage => {
                this.htmlToPng(kudoImage.id).then(stringUrl => {
                    saveAs(this.createBlob(stringUrl), `Kudo_${kudoImage.kudoId}.png`, { autoBom: true });

                    // this.downloadImage(dataUrl, kudoImage.kudoId);
                });
            });
        }
    }

    createBlob(image): Blob {
        const binaryData = this.convertDataURIToBinary(image);
        return new Blob([binaryData], { type: 'image/png' });
    }

    isSelected(kudoId): boolean {
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
