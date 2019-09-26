import { Component, OnInit, HostListener, HostBinding } from '@angular/core';

import { Subscription, Subject, from, of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { delay, map, concatMap, catchError } from 'rxjs/operators';
import * as Logger from 'js-logger';
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
    public width;
    selected = '5';
    public styleImage;
    public styleMatCard;
    public styleTextarea;
    public styleReceiver;
    public styleHeader;
    public numberOfKudos = 5;

    constructor(private _kudoService: KudoService, private _wallOfFameService: WallOfFameService) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.isOnline = navigator.onLine;
        this.getWallOfFame();

        // this.kudos$.pipe(map(kudos => from(kudos).pipe(delay(200)))).subscribe(x => console.log(x));
        this.breakKudosStreamToSingleKudos$
            .pipe(
                map(data => {
                    from(data.kudos).subscribe(kudo => {
                        this.kudos$.next({ kudo, addToFront: data.addToFront });
                    });
                }),
            )
            .subscribe();
        this.kudos$.pipe(concatMap(kudo => of(kudo).pipe(delay(575)))).subscribe(data => {
            if (data.addToFront) {
                this.kudos = [data.kudo, ...this.kudos];
            } else {
                this.kudos = [...this.kudos, data.kudo];
            }
        });

        this._wallOfFameService.updateWallOfFameWithLatestFromEvent().subscribe(kudos => {
            Logger.info('updateFromSocketIo:', kudos);
            this.breakKudosStreamToSingleKudos$.next({ kudos, addToFront: true });
        });

        this.onResize();
    }

    getWallOfFame() {
        this._allKudosSubscriptions.push(
            this._kudoService.getAllKudos(this.skip).subscribe(data => {
                if (this.kudos.length === 0) {
                    this.kudos = [...data];
                } else {
                    this.breakKudosStreamToSingleKudos$.next({ kudos: data, addToFront: false });
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

    @HostListener('window:resize')
    onResize() {
        this.checkWidth();
        this.changeNumberOfKudosShown(this.numberOfKudos);
    }

    checkWidth() {
        this.width = window.innerWidth;
    }

    changeNumberOfKudosShown(number) {
        this.numberOfKudos = number;
        if (this.width > 720) {
            const widthKudo = (this.width - 100 - number * 2 * 4) / number;
            const scale = 500 / widthKudo;
            this.styleMatCard = {
                width: `${widthKudo}px`,
                height: `${widthKudo}px`,
            };
            this.styleImage = {
                width: `${widthKudo}px`,
            };
            this.styleTextarea = {
                top: `${148 / scale / 1.12}px`,
                left: `${90 / scale / 1.22}px`,
                width: `${355 / scale}px`,
                height: `${225 / scale}px`,
                'line-height': `${35.5 / scale}px`,
                'font-size': `${22 / scale}px`,
            };
            this.styleReceiver = {
                bottom: `${30 / scale / 3.3}px`,
                left: `${70 / scale / 1.3}px`,
                'font-size': `${15 / scale}px`,
            };
        } else {
            this.styleMatCard = {
                width: '300px',
                height: '300px',
                margin: '16px',
            };
            this.styleImage = {
                width: '300px',
            };
            this.styleTextarea = {
                top: '78px',
                left: '44px',
                width: '225px',
                height: '150px',
                'line-height': '21.5px',
                'font-size': '14px',
            };

            this.styleReceiver = {
                bottom: '5px',
                left: '30px',
                'font-size': '10px',
            };
        }
    }
}
