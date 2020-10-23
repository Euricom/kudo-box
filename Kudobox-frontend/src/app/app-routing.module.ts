import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { OidcGuardService } from './services/OidcGuardService';
import { IsAdminGuardService } from './services/IsAdminGuardService';
import { AuthCallbackComponent } from './core/auth-callback/auth-callback.component';
import { OfflineGuardService } from './services/OfflineGuardService';
import { OfflineComponent } from './core/offline/offline.component';
// canActivate: [OidcGuardService]
const routes: Routes = [
    { path: '', redirectTo: 'kudos', pathMatch: 'full', canActivate: [OidcGuardService] },
    { path: 'auth', component: AuthCallbackComponent },
    { path: 'offline', component: OfflineComponent },
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
    {
        path: 'public-kudo',
        loadChildren: () => import('./public-kudo/public-kudo.module').then(m => m.PublicKudoModule),
    },
    {
        path: 'share-kudo',
        loadChildren: () => import('./share-kudo/share-kudo.module').then(m => m.ShareKudoModule),
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [OidcGuardService, IsAdminGuardService],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
