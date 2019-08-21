import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewKudoComponent } from './components/newKudo/newKudo.component';
import { CreateComponent } from './components/create/create.component';
import { MatToolbarModule, MatCardModule, MatMenuModule, MatIconModule,
   MatButtonModule, MatListModule, MatSidenavModule } from '@angular/material';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NewKudoComponent,
    CreateComponent,
    MyKudoComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
