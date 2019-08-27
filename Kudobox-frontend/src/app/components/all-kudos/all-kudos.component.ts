import { Component, OnInit } from '@angular/core';

import { kudoImages } from '../../data/kudoImages';

@Component({
    selector: 'app-all-kudos',
    templateUrl: './all-kudos.component.html',
    styleUrls: ['./all-kudos.component.scss'],
})
export class AllKudosComponent implements OnInit {
    public kudos: Array<Object>;
    public searchText;

    constructor() {}

    ngOnInit() {
        this.kudos = kudoImages;
    }
}
