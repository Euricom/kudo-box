import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { NewKudoComponent } from './components/newKudo/newKudo.component';
import { MyKudoComponent } from './components/my-kudo/my-kudo.component';


const routes: Routes = [
  { path: 'kudo/create/:id', component: CreateComponent },
  { path: 'kudo', component: NewKudoComponent },
  { path: 'myKudo', component: MyKudoComponent },
  { path: '', redirectTo: 'kudo', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
