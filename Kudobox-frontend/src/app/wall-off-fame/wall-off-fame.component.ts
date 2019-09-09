import { Component, OnInit } from '@angular/core';

import { Subscription, Observable, Subject } from 'rxjs';
import { tryParse } from 'selenium-webdriver/http';
import { kudoImages } from '../data/kudoImages';
import { KudoService } from '../services/kudo.service';

@Component({
    selector: 'app-wall-off-fame',
    templateUrl: './wall-off-fame.component.html',
    styleUrls: ['./wall-off-fame.component.scss'],
})
export class WallOffFameComponent implements OnInit {
    public kudoImages;
    public kudos = [];
    public kudos$: Subject<any[]> = new Subject<[]>();
    public searchText;
    public isOnline = false;
    private _allKudosSubscriptions: Subscription[] = [];
    public skip = 0;
    constructor(private _kudoService: KudoService) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.isOnline = navigator.onLine;
        this.getWallOfFame();
        this.kudos$.subscribe(kudos => {
            this.kudos = [...this.kudos, ...kudos];
        });
    }

    getWallOfFame() {
        this._allKudosSubscriptions.push(
            this._kudoService.getAllKudos(this.skip).subscribe(data => {
                this.kudos$.next(data);
            }),
        );
        this.increaseSkip();
    }

    increaseSkip() {
        this.skip += 50;
    }

    ngOnDestroy() {
        this._allKudosSubscriptions.forEach(s => s.unsubscribe());
    }

    getKudoImage(id: number) {
        const image = this.kudoImages.filter(kudo => {
            if (kudo.id === id) {
                return kudo.url;
            }
        });
        return image[0].url;
    }
}
