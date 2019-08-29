import { Component, OnInit } from '@angular/core';
import { kudoImages } from '../data/kudoImages';

@Component({
    selector: 'app-my-kudos',
    templateUrl: './my-kudos.component.html',
    styleUrls: ['./my-kudos.component.scss'],
})
export class MyKudosComponent implements OnInit {
    public kudos: Array<object>;
    public linkToShare = 'https://google.com';
    constructor() {}

    ngOnInit() {
        this.kudos = kudoImages;
    }
}
