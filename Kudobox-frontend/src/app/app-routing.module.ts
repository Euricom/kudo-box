import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { NewKudoComponent } from './components/newKudo/newKudo.component';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';
import { SendComponent } from './components/send/send.component';
import { OidcGuardService } from './services/OidcGuardService';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

const routes: Routes = [
    { path: 'kudo/create/:id', component: CreateComponent, canActivate: [OidcGuardService] },
    { path: 'kudo/send', component: SendComponent, canActivate: [OidcGuardService] },
    { path: 'kudo', component: NewKudoComponent, canActivate: [OidcGuardService] },
    { path: 'myKudo', component: MyKudoComponent, canActivate: [OidcGuardService] },
    { path: 'auth', component: AuthCallbackComponent },
    { path: '', redirectTo: 'kudo', pathMatch: 'full', canActivate: [OidcGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
