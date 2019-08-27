import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-new-kudo',
    templateUrl: './newKudo.component.html',
    styleUrls: ['./newKudo.component.scss'],
})
export class NewKudoComponent implements OnInit {
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
