import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

import { ConnexionComponent } from './connexion/connexion.component';

import { AdministrationComponent } from './administration/administration.component';
import { GestionUsersComponent } from './administration/gestion-users/gestion-users.component';
import { GestionServicesComponent } from './administration/gestion-services/gestion-services.component';

import { CongesComponent } from './conges/conges.component';
import { DemanderComponent } from './conges/demander/demander.component';
import { ValidationComponent } from './conges/validation/validation.component';
import { HistoriqueComponent } from './conges/historique/historique.component';
import { EditercongesComponent } from './conges/editerconges/editerconges.component';

import { MissionsComponent } from './missions/missions.component';
import { CreerComponent } from './missions/creer/creer.component';
import { SuiviComponent } from './missions/suivi/suivi.component';
import { EditerComponent } from './missions/editer/editer.component';

import { ProfilComponent } from './profil/profil.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },

  { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent },

  { path: 'administration', canActivate: [AuthGuard], component: AdministrationComponent,
children: [
  {path: 'gestionusers', canActivate: [AuthGuard], component: GestionUsersComponent},
  { path: 'gestionservices', canActivate: [AuthGuard], component: GestionServicesComponent },
  { path: '**', redirectTo: 'notfound' }
]},

  {
    path: 'conges', canActivate: [AuthGuard], component: CongesComponent,
    children: [
      { path: 'historique', canActivate: [AuthGuard], component: HistoriqueComponent },
      { path: 'demander', canActivate: [AuthGuard], component: DemanderComponent },
      { path: 'accepter', canActivate: [AuthGuard], component: ValidationComponent },
      { path: 'editer/:did', canActivate: [AuthGuard], component: EditercongesComponent },
      { path: 'notfound', canActivate: [AuthGuard], component: NotfoundComponent },
      { path: '**', redirectTo: 'notfound' }
    ]
  },
  {
    path: 'mission', canActivate: [AuthGuard], component: MissionsComponent,
    children: [
      { path: 'suivi', canActivate: [AuthGuard], component: SuiviComponent },
      { path: 'creer', canActivate: [AuthGuard], component: CreerComponent },
      { path: 'editer', canActivate: [AuthGuard], component: EditerComponent },
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
