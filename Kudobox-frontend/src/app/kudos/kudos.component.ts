import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { KudoService } from '../services/kudo.service';

@Component({
    selector: 'app-kudos',
    templateUrl: './kudos.component.html',
    styleUrls: ['./kudos.component.scss'],
})
export class KudosComponent implements OnInit, OnDestroy {
    public isMobile: boolean;

    constructor(private _kudoService: KudoService) {}

    ngOnInit() {
        this.checkWidth();
        window.addEventListener('online', this.updateOnlineStatus);
        this.updateOnlineStatus();
        this._kudoService.getUsersList().subscribe();
    }
    updateOnlineStatus = () => {
        if (navigator.onLine) {
            console.log('Syncing kudos', navigator.onLine);
            this._kudoService.syncKudos().subscribe();
        }
    };

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.checkWidth();
    }

    public checkWidth() {
        const width = window.innerWidth;
        if (width <= 992) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

    ngOnDestroy(): void {
        window.removeEventListener('online', this.updateOnlineStatus);
    }
}
