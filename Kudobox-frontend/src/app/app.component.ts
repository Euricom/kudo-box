import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'oidc-client';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { KudoService } from './services/kudo.service';
import { MatSidenavContainer, MatSidenav } from '@angular/material';
import { faPlusCircle, faAward, faBox, faBoxOpen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    public kudoCount: number;
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
