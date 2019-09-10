import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareKudoComponent } from './share-kudo.component';

const routes: Routes = [{ path: '', component: ShareKudoComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ShareKudoRoutingModule {}
