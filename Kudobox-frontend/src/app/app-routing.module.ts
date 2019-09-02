import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { NewKudoComponent } from './components/newKudo/newKudo.component';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';
import { SendComponent } from './components/send/send.component';
import { OidcGuardService } from './services/OidcGuardService';
//import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AuthCallbackComponent } from './core/auth-callback/auth-callback.component';
import { AllKudosComponent } from './components/all-kudos/all-kudos.component';

const routes: Routes = [
    /*{ path: 'kudo/create/:id', component: CreateComponent, canActivate: [OidcGuardService] },
    { path: 'kudo/send', component: SendComponent, canActivate: [OidcGuardService] },
    { path: 'kudo', component: NewKudoComponent, canActivate: [OidcGuardService] },
    { path: 'myKudo', component: MyKudoComponent, canActivate: [OidcGuardService] },
    { path: 'allKudos', component: AllKudosComponent, canActivate: [OidcGuardService] },*/
    { path: 'auth', component: AuthCallbackComponent },
    { path: '', redirectTo: 'kudos', pathMatch: 'full', canActivate: [OidcGuardService] },
    {
        path: 'wall-of-fame',
        loadChildren: () => import('./wall-off-fame/wall-off-fame.module').then(m => m.WallOffFameModule),
    },
    { path: 'my-kudos', loadChildren: () => import('./my-kudos/my-kudos.module').then(m => m.MyKudosModule) },
    { path: 'kudos', loadChildren: () => import('./kudos/kudos.module').then(m => m.KudosModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
