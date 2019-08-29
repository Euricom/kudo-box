import { Component, OnInit } from '@angular/core';
import { kudoImages } from '../data/kudoImages';

@Component({
    selector: 'app-wall-off-fame',
    templateUrl: './wall-off-fame.component.html',
    styleUrls: ['./wall-off-fame.component.scss'],
})
export class WallOffFameComponent implements OnInit {
    public kudos: Array<Record<string, any>>;
    public searchText;
    constructor() {}

    ngOnInit() {
        this.kudos = kudoImages;
    }
}
