import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MsAdalAngular6Module, AuthenticationGuard } from 'microsoft-adal-angular6';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';
import { NewKudoComponent } from './components/newKudo/newKudo.component';
import { SendComponent } from './components/send/send.component';
import { KudoService } from './shared/kudo.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AllKudosComponent } from './components/all-kudos/all-kudos.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { CarouselKudosComponent } from './components/carousel-kudos/carousel-kudos.component';
import { ListKudosComponent } from './components/list-kudos/list-kudos.component';

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
        AllKudosComponent,
        ScrollTopComponent,
        CarouselKudosComponent,
        ListKudosComponent,
    ],
    imports: [
        MsAdalAngular6Module.forRoot({
            tenant: environment.azure.tenantID,
            clientId: environment.azure.clientID,
            redirectUri: environment.azure.redirectUri,
            endpoints: environment.azure.endpoints,
            navigateToLoginRequestUri: environment.azure.navigateToLoginRequestUri,
            cacheLocation: environment.azure.cacheLocation,
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
        MatFormFieldModule,
        MatInputModule,
        ShareButtonsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        KonvaModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        NotifierModule.withConfig(customNotifierOptions),
        Ng2SearchPipeModule,
    ],
    providers: [
        AuthenticationGuard,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        KudoService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
