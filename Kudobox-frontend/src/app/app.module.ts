/* eslint-disable @typescript-eslint/camelcase */
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Logger from 'js-logger';

import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { KonvaModule } from 'ng2-konva';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { config } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';
import { NewKudoComponent } from './components/newKudo/newKudo.component';
import { SendComponent } from './components/send/send.component';
import { KudoService } from './services/kudo.service';
import { OidcGuardService } from './services/OidcGuardService';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LogoutCallbackComponent } from './components/logout-callback/logout-callback.component';
import { AllKudosComponent } from './components/all-kudos/all-kudos.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';

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
    declarations: [
        AppComponent,
        NewKudoComponent,
        CreateComponent,
        MyKudoComponent,
        SendComponent,
        AuthCallbackComponent,
        LogoutCallbackComponent,
        AppComponent,
        NewKudoComponent,
        CreateComponent,
        MyKudoComponent,
        SendComponent,
        AllKudosComponent,
        ScrollTopComponent,
    ],
    imports: [
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
        MatFormFieldModule,
        MatInputModule,
        ShareButtonsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        KonvaModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        NotifierModule.withConfig(customNotifierOptions),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        Ng2SearchPipeModule,
    ],
    providers: [
        KudoService,
        OidcGuardService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
        // Setup logging
        const consoleHandler = (Logger as any).createDefaultHandler();

        Logger.useDefaults();
        Logger.setLevel(environment.logLevel);
        Logger.setHandler((messages, context) => {
            if (isDevMode()) {
                consoleHandler(messages, context);
            }
        });
    }
}
