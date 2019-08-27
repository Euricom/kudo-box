import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'auth-callback',
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {
    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.authService.completeAuthentication().then();
    }
}
