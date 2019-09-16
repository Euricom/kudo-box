import { Component, OnInit, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';

import { kudoImages } from '../../data/kudoImages';
import { KudoService } from '../../services/kudo.service';

interface Window {
    Image: any;
    innerWidth: any;
}
declare const window: Window;

@Component({
    selector: 'kudos-create',
    templateUrl: './kudos-create.component.html',
    styleUrls: ['./kudos-create.component.scss'],
})
export class KudosCreateComponent implements OnInit {
    routeSubscription: Subscription;

    public baseImageUrl: string;
    public fontFamily = 'Comic Sans MS';
    public kudoId: number;
    public isTextareaFilled: boolean = true;
    public faSmile = faSmile;
    public showEmojis = false;
    public kudoText;
    public emojisPerLine = 9;
    public totalFrequentLines = 4;

    constructor(private route: ActivatedRoute, private router: Router, private _kudoService: KudoService) {}

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            const image = kudoImages.find(i => i.id === parseInt(params.id, 10));
            this.baseImageUrl = image.url;
            this.kudoId = params.id;
        });
        this.checkWidth();
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.checkWidth();
    }

    public checkWidth() {
        const width = window.innerWidth;
        if (width <= 600) {
            this.emojisPerLine = 6;
            this.totalFrequentLines = 1;
        } else {
            this.emojisPerLine = 9;
            this.totalFrequentLines = 4;
        }
    }

    changeFont(font) {
        this.fontFamily = font;
    }

    createCanvas(text) {
        if (text) {
            const kudo = {
                kudoId: this.kudoId,
                text: text,
                fontFamily: this.fontFamily,
                receiver: '',
            };

            this._kudoService.kudo = kudo;

            this.router.navigate([`/kudos/send`]);
        } else {
            this.isTextareaFilled = false;
        }
    }

    showEmoji() {
        this.showEmojis = !this.showEmojis;
    }

    addEmoji(event) {
        this.kudoText += `${event.emoji.native}`;
    }

    onClickedOutside(e: Event) {
        this.showEmojis = false;
    }
}
