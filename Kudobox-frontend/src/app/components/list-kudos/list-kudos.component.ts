import { Component, OnInit } from '@angular/core';
import { kudoImages } from '../../data/kudoImages';

@Component({
    selector: 'app-list-kudos',
    templateUrl: './list-kudos.component.html',
    styleUrls: ['./list-kudos.component.scss'],
})
export class ListKudosComponent implements OnInit {
    public kudos: Array<object>;
    constructor() {}

    ngOnInit() {
        this.kudos = kudoImages;
    }
}
