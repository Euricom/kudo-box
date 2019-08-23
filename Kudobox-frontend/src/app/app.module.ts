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

import { SendComponent } from './components/send/send.component';

import { KudoService } from './shared/kudo.service';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';
import { NewKudoComponent } from './components/newKudo/newKudo.component';

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
    ],
    providers: [AuthenticationGuard, KudoService],
    bootstrap: [AppComponent],
})
export class AppModule {}
