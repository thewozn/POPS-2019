import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { CongesComponent } from './conges/conges.component';
import { NotesfraisComponent } from './notesfrais/notesfrais.component';
import { MissionsComponent } from './missions/missions.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DemanderComponent } from './conges/demander/demander.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import 'node_modules/flatpickr/dist/flatpickr.css';
import {CserviceService} from './services/cservice.service';
import { ValidationComponent } from './conges/validation/validation.component';
import { FicheUtilisateurComponent } from './fiche-utilisateur/fiche-utilisateur.component';

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
    FicheUtilisateurComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot(),
  ],
  providers: [UsersService, CserviceService],
  bootstrap: [AppComponent],
  exports: [DemanderComponent]
})
export class AppModule { }
