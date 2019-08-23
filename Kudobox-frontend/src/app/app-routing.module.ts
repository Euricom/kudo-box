import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'microsoft-adal-angular6';

import { CreateComponent } from './components/create/create.component';
import { NewKudoComponent } from './components/newKudo/newKudo.component';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';
import { SendComponent } from './components/send/send.component';

const routes: Routes = [
    { path: 'kudo/create/:id', component: CreateComponent },
    { path: 'kudo/send', component: SendComponent },
    { path: 'kudo', component: NewKudoComponent /*, canActivate: [AuthenticationGuard] */ },
    { path: 'myKudo', component: MyKudoComponent },
    { path: '', redirectTo: 'kudo', pathMatch: 'full', canActivate: [AuthenticationGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
