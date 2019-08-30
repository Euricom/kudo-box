import { Component, OnInit } from '@angular/core';

import { kudoImages } from '../../data/kudoImages';
import { KudoService } from '../../services/kudo.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-all-kudos',
    templateUrl: './all-kudos.component.html',
    styleUrls: ['./all-kudos.component.scss'],
})
export class AllKudosComponent implements OnInit {
    public kudoImages;
    public kudos;
    public searchText;
    allKudosSubscription: Subscription;

    constructor(private _kudoService: KudoService) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.allKudosSubscription = this._kudoService.getAllKudos().subscribe(data => {
            this.kudos = data;
        });
    }

    ngOnDestroy() {
        this.allKudosSubscription.unsubscribe();
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
