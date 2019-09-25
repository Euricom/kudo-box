/* eslint-disable @typescript-eslint/camelcase */
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, isDevMode, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KudoService } from './services/kudo.service';
import { OidcGuardService } from './services/OidcGuardService';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './core/auth-callback/auth-callback.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LogoutCallbackComponent } from './core/logout-callback/logout-callback.component';
import { ScrollTopComponent } from './core/scroll-top/scroll-top.component';
import { ErrorHandlerService } from './services/error-handler.service';
import { OfflineComponent } from './core/offline/offline.component';
import { OfflineGuardService } from './services/OfflineGuardService';
import { IndexedDbService } from './services/indexed-db.service';

const socketIoConfig: SocketIoConfig = {
  url: `${environment.socketIo.socketIoUrl}`,
    options: {
      autoConnect: true,
      secure:true,
      rejectUnauthorized : false
} };

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
    declarations: [AppComponent, AuthCallbackComponent, LogoutCallbackComponent, ScrollTopComponent, OfflineComponent],
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
        ReactiveFormsModule,
        NotifierModule.withConfig(customNotifierOptions),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        Ng2SearchPipeModule,
        FontAwesomeModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerImmediately',
        }),
        PickerModule,
        SocketIoModule.forRoot(socketIoConfig),
    ],
    providers: [
        KudoService,
        IndexedDbService,
        OidcGuardService,
        OfflineGuardService,
        AuthService,
        ErrorHandlerService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: ErrorHandler, useClass: ErrorHandlerService },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        // Setup logging
        const consoleHandler = (Logger as any).createDefaultHandler();

        Logger.useDefaults();
        Logger.setLevel(environment.logLevel);
        Logger.setHandler((messages, context) => {
            //if (isDevMode()) {
                consoleHandler(messages, context);
            //}
        });

        const icons = [faFacebookF, faTwitter, faLinkedinIn];
        library.addIcons(...icons);
        console.log('socketIoUrl',environment.socketIo.socketIoUrl)
        Logger.error('socketIoUrl',environment.socketIo.socketIoUrl)
    }
}
