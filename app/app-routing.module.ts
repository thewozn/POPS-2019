import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

import { ConnexionComponent } from './connexion/connexion.component';

import {CongesComponent} from './conges/conges.component';
import {DemanderComponent} from './conges/demander/demander.component';

import { FicheUtilisateurComponent } from './fiche-utilisateur/fiche-utilisateur.component';
import { ValidationComponent } from './conges/validation/validation.component';
import { HistoriqueComponent } from './conges/historique/historique.component';

import { NotfoundComponent } from './notfound/notfound.component';
import { AdministrationComponent } from './administration/administration.component';


import { MissionsComponent } from './missions/missions.component';
const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'mission', canActivate: [AuthGuard], component: MissionsComponent},
  { path: 'administration', canActivate: [AuthGuard], component: AdministrationComponent},

  {
    path: 'conges', canActivate: [AuthGuard], component: CongesComponent,
    children: [
      { path: 'fiche', canActivate: [AuthGuard], component: FicheUtilisateurComponent },
      { path: 'accepter', canActivate: [AuthGuard], component: ValidationComponent },
      { path: 'demander', canActivate: [AuthGuard], component: DemanderComponent },
      { path: 'historique', canActivate: [AuthGuard], component: HistoriqueComponent },
      { path: 'notfound', canActivate: [AuthGuard], component: NotfoundComponent },
      { path: '**', redirectTo: 'notfound' }
    ]
  },

  { path: '', canActivate: [AuthGuard], component: CongesComponent },

  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
