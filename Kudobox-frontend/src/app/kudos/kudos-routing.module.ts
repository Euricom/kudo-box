import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KudosComponent } from './kudos.component';
import { KudosCreateComponent } from './kudos-create/kudos-create.component';
import { OidcGuardService } from '../services/OidcGuardService';
import { KudosSendComponent } from './kudos-send/kudos-send.component';

const routes: Routes = [
    { path: '', component: KudosComponent, canActivate: [OidcGuardService] },
    { path: 'create/:id', component: KudosCreateComponent, canActivate: [OidcGuardService] },
    { path: 'send', component: KudosSendComponent, canActivate: [OidcGuardService] },
    /* { path: '', component: KudosComponent },
    { path: 'create/:id', component: KudosCreateComponent },
    { path: 'send', component: KudosSendComponent },*/
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KudosRoutingModule {}
