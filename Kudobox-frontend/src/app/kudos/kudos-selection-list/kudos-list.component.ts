import { Component, OnInit } from '@angular/core';
import { kudoImages } from '../../data/kudoImages';

@Component({
    selector: 'kudos-list',
    templateUrl: './kudos-list.component.html',
    styleUrls: ['./kudos-list.component.scss'],
})
export class KudosListComponent implements OnInit {
    public kudos;
    constructor() {}

    ngOnInit() {
        this.kudos = kudoImages;
    }
}
