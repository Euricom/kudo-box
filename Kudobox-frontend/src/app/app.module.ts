import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { KonvaModule } from 'ng2-konva';
import { MsAdalAngular6Module, AuthenticationGuard } from 'microsoft-adal-angular6';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';
import { NewKudoComponent } from './components/newKudo/newKudo.component';
import { SendComponent } from './components/send/send.component';
import { KudoService } from './shared/kudo.service';
import { TokenInterceptor } from './interceptors/token.interceptor';

const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 12,
        },
        vertical: {
            position: 'bottom',
            distance: 12,
            gap: 10,
        },
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease',
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50,
        },
        shift: {
            speed: 300,
            easing: 'ease',
        },
        overlap: 150,
    },
};

@NgModule({
    declarations: [AppComponent, NewKudoComponent, CreateComponent, MyKudoComponent, SendComponent],
    imports: [
        MsAdalAngular6Module.forRoot({
            tenant: '0b53d2c1-bc55-4ab3-a161-927d289257f2',
            clientId: 'de411acd-f5d7-4040-8da6-3d3adce56901',
            redirectUri: 'http://localhost:4200/auth',
            endpoints: {},
            navigateToLoginRequestUri: false,
            cacheLocation: 'localStorage',
        }),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCarouselModule,
        MatCardModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        ShareButtonsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        KonvaModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        NotifierModule.withConfig(customNotifierOptions),
    ],
    providers: [
        AuthenticationGuard,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        KudoService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
