import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import 'node_modules/flatpickr/dist/flatpickr.css';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatSelectModule} from '@angular/material/select';

import { GlobalService } from './services/global.service';

import { ConnectedService } from './services/connected.service';
import { VacationRequestService } from './services/vacation-request.service';
import { UserService } from './services/user.service';
import { ExpenseReportLineService } from './services/expense-report-line.service';
import { ExpenseReportRequestService } from './services/expense-report-request.service';
import { MissionService } from './services/mission.service';
import { ServiceService } from './services/service.service';
import { TypeOfLeaveService } from './services/type-of-leave.service';
import { VacationsService } from './services/vacations.service';

import { ConnexionComponent } from './connexion/connexion.component';

import { CongesComponent } from './conges/conges.component';
import { DemanderComponent } from './conges/demander/demander.component';
import { ValidationComponent } from './conges/validation/validation.component';
import { HistoriqueComponent } from './conges/historique/historique.component';
import { TabcomponentPipe } from './conges/tabcomponent.pipe';
import { ValcomponentPipe } from './conges/valcomponent.pipe';

import { NotesfraisComponent } from './notesfrais/notesfrais.component';

import { MissionsComponent } from './missions/missions.component';
import { SuiviComponent } from './missions/suivi/suivi.component';
import { CreationComponent } from './missions/creation/creation.component';

import { FicheUtilisateurComponent } from './fiche-utilisateur/fiche-utilisateur.component';

import { AdministrationComponent } from './administration/administration.component';
import { GestionUsersComponent } from './administration/gestion-users/gestion-users.component';
import { GestionServicesComponent } from './administration/gestion-services/gestion-services.component';

import { NotfoundComponent } from './notfound/notfound.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    CongesComponent,
    NotesfraisComponent,
    MissionsComponent,
    NotfoundComponent,
    DemanderComponent,
    ValidationComponent,
    FicheUtilisateurComponent,
    ConnexionComponent,
    HistoriqueComponent,
    TabcomponentPipe,
    ValcomponentPipe,
    AdministrationComponent,
    GestionUsersComponent,
    GestionServicesComponent,
    SuiviComponent,
    CreationComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFontAwesomeModule,
    MatSelectModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot()
  ],
  providers: [
    ConnectedService,
    VacationRequestService,
    UserService,
    ExpenseReportLineService,
    ExpenseReportRequestService,
    ConnectedService,
    ServiceService,
    TypeOfLeaveService,
    MissionService,
    VacationsService,
    MatDatepickerModule,
    ReactiveFormsModule,
    GlobalService
  ],
  bootstrap: [AppComponent],
  exports: [DemanderComponent]
})
export class AppModule {}
