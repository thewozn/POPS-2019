import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CongesComponent} from './conges/conges.component';
import {DemanderComponent} from './conges/demander/demander.component';
import {NotfoundComponent} from './notfound/notfound.component';

const routes: Routes = [
  { path: 'conges', component: CongesComponent,
    children: [
      { path: 'demander', component: DemanderComponent },
      { path: 'notfound', component: NotfoundComponent },
      { path: '**', redirectTo: 'notfound' }
      ]},
  { path: '', component: CongesComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
