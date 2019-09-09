import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { kudoImages } from '../data/kudoImages.js';
import { KudoService } from '../services/kudo.service';
import { ActivatedRoute } from '@angular/router';
import { Kudo } from '../models/kudo.js';

@Component({
    selector: 'app-public-kudo',
    templateUrl: './public-kudo.component.html',
    styleUrls: ['./public-kudo.component.scss'],
})
export class PublicKudoComponent implements OnInit {
    public kudoImages;
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
        /*this.kudo = {
            createdOn: '2019-09-09T07:55:52.631Z',
            fontFamily: 'Comic Sans MS',
            kudoId: 1,
            receiver: '5d75fcb38a3fea4b1428f435',
            sender: {
                _id: '5d75fcb38a3fea4b1428f435',
                name: 'Silke Venneman',
                email: 'silke.venneman@euri.com',
                __v: 0,
            },
            status: 'read',
            text: 'LEXEND ZETTA',
            __v: 0,
            _id: '5d7605408a3fea4b1428f444',
        };
        this.baseImageUrl = '/assets/Well_Done.jpg';*/
    }
}
