import { Component, OnInit } from '@angular/core';

import { Subscription, Subject, from, of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { delay, map, concatMap, catchError } from 'rxjs/operators';
import { kudoImages } from '../data/kudoImages';
import { KudoService } from '../services/kudo.service';
import { WallOfFameService } from '../services/wall-of-fame.service';

@Component({
    selector: 'app-wall-off-fame',
    templateUrl: './wall-off-fame.component.html',
    styleUrls: ['./wall-off-fame.component.scss'],
    animations: [
        trigger('items', [
            transition(':enter', [
                style({ transform: 'scale(0.6) translateX(-100%) translateY(-40%)', opacity: 0 }), // initial
                animate(
                    `0.4s cubic-bezier(.56,.24,.81,.42)`,
                    style({ transform: 'scale(1) translateX(0%) translateY(0%)', opacity: 1 }),
                ), // final
            ]),
        ]),
    ],
})
export class WallOffFameComponent implements OnInit {
    public kudoImages;
    public kudos = [];
    public kudos$: Subject<any> = new Subject<any>();
    public breakKudosStreamToSingleKudos$: Subject<any> = new Subject<any>();
    public searchText;
    public isOnline = false;
    private _allKudosSubscriptions: Subscription[] = [];
    public skip = 0;
    constructor(private _kudoService: KudoService, private _wallOfFameService: WallOfFameService) {}

    public testKudo = {
        _id: '5d7f5229bd8c6416c4919951',
        kudoId: 1,
        text: 'dzadzadzadzadzadza',
        fontFamily: 'Comic Sans MS',
        receiver: { _id: '5d763405f70695417ce7ba4e', name: 'Sfen Helaers', email: 'sfen.helaers@euri.com', __v: 0 },
        sender: '5d763405f70695417ce7ba47',
        status: 'unread',
        createdOn: '2019-09-16T09:13:13.623Z',
        __v: 0,
    };

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.isOnline = navigator.onLine;
        this.getWallOfFame();

        // this.kudos$.pipe(map(kudos => from(kudos).pipe(delay(200)))).subscribe(x => console.log(x));
        this.breakKudosStreamToSingleKudos$
            .pipe(
                map((kudos: []) => {
                    from(kudos).subscribe(kudo => {
                        this.kudos$.next(kudo);
                    });
                }),
            )
            .subscribe();
        this.kudos$.pipe(concatMap(kudo => of(kudo).pipe(delay(575)))).subscribe(kudo => {
            this.kudos = [kudo, ...this.kudos];
        });

        this._wallOfFameService.updateWallOfFameWithLatestFromEvent().subscribe(kudos => {
            this.breakKudosStreamToSingleKudos$.next(kudos);
        });
    }

    addKudoTest() {
        const kudos = [];
        for (let i = 0; i < 10; i++) {
            const testKudo = { ...this.testKudo };
            testKudo._id = new Date().toLocaleString();
            testKudo.createdOn = new Date().toString();
            kudos.push(testKudo);
        }
        this.breakKudosStreamToSingleKudos$.next(kudos);
    }

    getWallOfFame() {
        this._allKudosSubscriptions.push(
            this._kudoService.getAllKudos(this.skip).subscribe(data => {
                if (this.kudos.length === 0) {
                    this.kudos = [...data];
                } else {
                    this.breakKudosStreamToSingleKudos$.next(data);
                }
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
            return null;
        });
        return image[0].url;
    }
}
