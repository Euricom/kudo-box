import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'kudobox';

    constructor(private authService: AuthService, private route: Router) {}

    logout() {
        this.authService.startLogout();
    }
}
