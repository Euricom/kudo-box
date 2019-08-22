import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
} from '@angular/material';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { FormsModule } from '@angular/forms';
import { KonvaModule } from 'ng2-konva';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewKudoComponent } from './components/newKudo/newKudo.component';
import { CreateComponent } from './components/create/create.component';
import { environment } from '../environments/environment';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';

@NgModule({
    declarations: [AppComponent, NewKudoComponent, CreateComponent, MyKudoComponent],
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
        ShareButtonsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        KonvaModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
    ],
})
export class AppModule {}
