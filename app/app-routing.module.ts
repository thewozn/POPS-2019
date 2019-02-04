import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CongesComponent} from './conges/conges.component';
import {DemanderComponent} from './conges/demander/demander.component';
import {NotfoundComponent} from './notfound/notfound.component';
import { FicheUtilisateurComponent } from './fiche-utilisateur/fiche-utilisateur.component';
import { ValidationComponent } from './conges/validation/validation.component';

const routes: Routes = [
  {
    path: 'conges', component: CongesComponent,
    children: [
      { path: 'fiche', component: FicheUtilisateurComponent },
      { path: 'accepter', component: ValidationComponent },
      { path: 'demander', component: DemanderComponent },
      { path: 'notfound', component: NotfoundComponent },
      { path: '**', redirectTo: 'notfound' }
    ]
  },

  { path: '', component: CongesComponent },

  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
