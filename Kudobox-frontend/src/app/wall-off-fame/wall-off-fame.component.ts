import { Component, OnInit, HostListener, HostBinding } from '@angular/core';

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
    public width;
    selected = '3';
    public styleImage;
    public styleMatCard;
    public styleTextarea;
    public styleReceiver;
    public styleHeader;
    public numberOfKudos = 3;

    constructor(private _kudoService: KudoService) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.isOnline = navigator.onLine;
        this.getWallOfFame();
        this.kudos$.subscribe(kudos => {
            this.kudos = [...this.kudos, ...kudos];
        });

        this.onResize();
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

    @HostListener('window:resize', ['$event'])
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
            console.log('number', number);
            console.log('width is bigger then 1200', this.width);
            let widthKudo = (this.width - 100 - number * 2 * 16) / number;
            let scale = 500 / widthKudo;
            console.log('scale', scale);
            this.styleMatCard = {
                width: widthKudo + 'px',
                height: widthKudo + 'px',
                margin: 16 / scale + 'px',
            };
            this.styleImage = {
                width: widthKudo + 'px',
            };
            this.styleTextarea = {
                top: 148 / scale / 1.12 + 'px',
                left: 90 / scale / 1.22 + 'px',
                width: 355 / scale + 'px',
                height: 225 / scale + 'px',
                'line-height': 35.5 / scale + 'px',
                'font-size': 22 / scale + 'px',
            };
            this.styleReceiver = {
                bottom: 30 / scale / 3.3 + 'px',
                left: 70 / scale / 1.3 + 'px',
                'font-size': 15 / scale + 'px',
            };
            let widthOfKudosAndMargin = widthKudo * number + (16 / scale) * 2 * number;
            console.log('widthOfKudosAndMargin', widthOfKudosAndMargin);
            let headerWidth = (this.width - widthOfKudosAndMargin) / 2 + widthOfKudosAndMargin - 16 / scale;
            console.log('headerWidth', headerWidth);

            console.log('widthKudo', widthKudo);
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
