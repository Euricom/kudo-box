import { Component, OnInit, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  styleUrls: ['./kudos-create.component.scss']
})
export class KudosCreateComponent implements OnInit {
    routeSubscription: Subscription;

    public baseImageUrl: string;
    public fontFamily = 'Comic Sans MS';
    public kudoId: number;
    public isTextareaFilled: boolean = true;

    constructor(private route: ActivatedRoute, private router: Router, private _kudoService: KudoService) {}

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            const image = kudoImages.find(i => i.id === parseInt(params.id, 10));
            this.baseImageUrl = image.url;
            this.kudoId = params.id;
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
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
}
