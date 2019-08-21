import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';


const routes: Routes = [
  { path: 'kudo/create/:id', component: CreateComponent },
  { path: 'kudo', component: ListComponent },
  { path: '', redirectTo: 'kudo', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
