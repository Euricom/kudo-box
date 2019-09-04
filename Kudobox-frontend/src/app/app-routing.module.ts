import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OidcGuardService } from './services/OidcGuardService';
import { AuthCallbackComponent } from './core/auth-callback/auth-callback.component';
import { OfflineGuardService } from './services/OfflineGuardService';
import { OfflineComponent } from './core/offline/offline.component';
// canActivate: [OidcGuardService]
const routes: Routes = [
    { path: 'auth', component: AuthCallbackComponent },
    { path: 'offline', component: OfflineComponent },
    { path: '', redirectTo: 'kudos', pathMatch: 'full', canActivate: [OidcGuardService] },
    {
        path: 'wall-of-fame',
        loadChildren: () => import('./wall-off-fame/wall-off-fame.module').then(m => m.WallOffFameModule),
        canActivate: [OidcGuardService, OfflineGuardService],
    },
    {
        path: 'my-kudos',
        loadChildren: () => import('./my-kudos/my-kudos.module').then(m => m.MyKudosModule),
        canActivate: [OidcGuardService, OfflineGuardService],
    },
    {
        path: 'kudos',
        loadChildren: () => import('./kudos/kudos.module').then(m => m.KudosModule),
        canActivate: [OidcGuardService],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
