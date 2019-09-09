import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { kudoImages } from '../data/kudoImages.js';
import { KudoService } from '../services/kudo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-public-kudo',
    templateUrl: './public-kudo.component.html',
    styleUrls: ['./public-kudo.component.scss'],
})
export class PublicKudoComponent implements OnInit {
    public kudoImages;
    public publicKudoSubscription: Subscription;
    public routeSubscription: Subscription;
    public kudo;
    public baseImageUrl;

    constructor(private route: ActivatedRoute, private _kudoService: KudoService) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.routeSubscription = this.route.params.subscribe(params => {
            this.publicKudoSubscription = this._kudoService.getPublicKudo(params.id).subscribe(data => {
                this.kudo = data;
                const image = kudoImages.find(i => i.id === parseInt(this.kudo.id, 10));
                this.baseImageUrl = image.url;
            });
        });
    }
}
