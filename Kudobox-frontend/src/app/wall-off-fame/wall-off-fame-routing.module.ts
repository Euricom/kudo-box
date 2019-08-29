import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WallOffFameComponent } from './wall-off-fame.component';

const routes: Routes = [{ path: '', component: WallOffFameComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WallOffFameRoutingModule {}
