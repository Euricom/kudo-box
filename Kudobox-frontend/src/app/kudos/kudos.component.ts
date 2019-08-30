import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-kudos',
    templateUrl: './kudos.component.html',
    styleUrls: ['./kudos.component.scss'],
})
export class KudosComponent implements OnInit {
    public isMobile: boolean;

    ngOnInit() {
        this.checkWidth();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.checkWidth();
    }

    public checkWidth() {
        var width = window.innerWidth;
        if (width <= 992) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }
}
