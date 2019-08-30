import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';

import { kudoImages } from '../../data/kudoImages';
import { KudoService } from '../../services/kudo.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-my-kudo',
    templateUrl: './my-kudo.component.html',
    styleUrls: ['./my-kudo.component.scss'],
})
export class MyKudoComponent implements OnInit {
    public kudos;
    public kudoImages;
    myKudosSubscription: Subscription;
    changeStatusSubscription: Subscription;

    public image;

    constructor(private _kudoService: KudoService) {}

    ngOnInit() {
        this.kudoImages = kudoImages;
        this.myKudosSubscription = this._kudoService.getMyKudos().subscribe(data => {
            this.kudos = data;
            this.changeStatusSubscription = this._kudoService.changeStatus('read').subscribe(() => {
                console.log('Kudos are updated');
            });
        });
    }

    ngOnDestroy() {
        this.myKudosSubscription.unsubscribe();
        this.changeStatusSubscription.unsubscribe();
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
