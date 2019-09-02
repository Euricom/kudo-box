import { Component, HostListener, ElementRef } from '@angular/core';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-scroll-top',
    templateUrl: './scroll-top.component.html',
    styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent {
    faArrowCircleUp = faArrowCircleUp;
    isShow: boolean;
    topPosToStartShowing = 100;

    @HostListener('window:scroll')
    onWindowScroll() {
        console.log('YOU SCROLLED');
        // window의 scroll top
        // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        if (scrollPosition >= this.topPosToStartShowing) {
            this.isShow = true;
        } else {
            this.isShow = false;
        }
    }

    // TODO: Cross browsing
    gotoTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }
}