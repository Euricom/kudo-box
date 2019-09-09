import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicKudoComponent } from './public-kudo.component';

const routes: Routes = [{ path: ':id', component: PublicKudoComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicKudoRoutingModule {}
