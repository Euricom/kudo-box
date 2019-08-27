import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'logout-callback',
    templateUrl: './logout-callback.component.html',
    styleUrls: ['./logout-callback.component.scss'],
})
export class LogoutCallbackComponent implements OnInit {
    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.authService.completeLogout().then();
    }
}
