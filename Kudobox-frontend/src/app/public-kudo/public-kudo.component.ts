import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { kudoImages } from '../data/kudoImages';
import { KudoService } from '../services/kudo.service';
import { KudoImage } from '../models/kudoImage';
import { Kudo } from '../models/kudo';

@Component({
    selector: 'app-public-kudo',
    templateUrl: './public-kudo.component.html',
    styleUrls: ['./public-kudo.component.scss'],
})
export class PublicKudoComponent implements OnInit {
    public kudoImages: KudoImage[];
    public publicKudoSubscription: Subscription;
    public routeSubscription: Subscription;
    public kudo: Kudo;
    public baseImageUrl;

    constructor(private route: ActivatedRoute, private _kudoService: KudoService) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.routeSubscription = this.route.params.subscribe(params => {
            this.publicKudoSubscription = this._kudoService.getPublicKudo(params.id).subscribe(data => {
                this.kudo = data;
                const image = kudoImages.find(i => i.id === this.kudo.kudoId);
                this.baseImageUrl = image.url;
            });
        });
    }
}
