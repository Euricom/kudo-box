import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { faPlusCircle, faAward, faBox, faBoxOpen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';
import { KudoService } from './services/kudo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    public kudoCount: number = 0;
    title = 'kudobox';
    sideNavSubscription: Subscription;

    faPlusCircle = faPlusCircle;
    faAward = faAward;
    faBox = faBox;
    faBoxOpen = faBoxOpen;
    faTimesCircle = faTimesCircle;

    constructor(private authService: AuthService, private route: Router, private _kudoService: KudoService) {}

    ngAfterViewInit() {
        this.sideNavSubscription = this.sidenav.openedStart.subscribe(() => {
            this._kudoService.getUnreadKudos().subscribe((data: number) => {
                this.kudoCount = data;
            });
        });
    }

    ngOnDestroy() {
        this.sideNavSubscription.unsubscribe();
    }

    logout() {
        this.authService.startLogout();
    }
}
