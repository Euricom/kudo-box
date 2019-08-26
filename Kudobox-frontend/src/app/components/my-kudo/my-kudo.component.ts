import { Component, OnInit } from '@angular/core';
import { kudoImages } from '../../data/kudoImages';

@Component({
    selector: 'app-my-kudo',
    templateUrl: './my-kudo.component.html',
    styleUrls: ['./my-kudo.component.scss'],
})
export class MyKudoComponent implements OnInit {
    public kudos: Array<object>;
    public linkToShare: string = 'https://google.com';
    public image = 'https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_1000x1000_$&$product=PartyCity/237864';

    ngOnInit() {
        this.kudos = kudoImages;
    }
}
