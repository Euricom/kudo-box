import { Component, OnInit } from '@angular/core';
import { kudoImages } from '../../data/kudoImages';

@Component({
    selector: 'app-my-kudo',
    templateUrl: './my-kudo.component.html',
    styleUrls: ['./my-kudo.component.scss'],
})
export class MyKudoComponent implements OnInit {
    public kudos: Array<object>;

    ngOnInit() {
        this.kudos = kudoImages;
    }
}
