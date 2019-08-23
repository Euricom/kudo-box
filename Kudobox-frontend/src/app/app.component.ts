import { Component } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'kudobox';

    constructor(private _adalService: MsAdalAngular6Service) {}

    logout() {
        this._adalService.logout();
    }
}
