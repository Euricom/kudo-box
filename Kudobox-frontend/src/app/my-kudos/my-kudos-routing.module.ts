import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyKudosComponent } from './my-kudos.component';

const routes: Routes = [{ path: '', component: MyKudosComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyKudosRoutingModule {}
