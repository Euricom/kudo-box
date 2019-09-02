import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OidcGuardService } from './services/OidcGuardService';
import { AuthCallbackComponent } from './core/auth-callback/auth-callback.component';

const routes: Routes = [
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
