import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { startOfDay, subDays, addDays, isSameDay, isSameMonth } from 'date-fns';
import { ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

import { ConnectedService } from '../../services/connected.service';
import { VacationRequestService } from '../../services/vacation-request.service';
import { VacationsService } from '../../services/vacations.service';
import { ParsingService } from '../../services/parsing.service';


import { User } from '../../models/user.model';
import { VacationRequest} from '../../models/vacation-request.model';
import { Vacations } from '../../models/vacations.model';
const colors: any = {
  red: {
    primary: '#c63325',
    secondary: '#c63325'
  },
};

@Component({
  selector: 'app-editerconges',
  templateUrl: './editerconges.component.html',
  styleUrls: ['./editerconges.component.scss']
})
export class EditercongesComponent implements OnInit, OnDestroy {

  private OwnVacationRequest: VacationRequest;
  private vacationRequest: VacationRequest[];
  vacationRequestSubscription: Subscription;
  connecteduser: User;
  

  private vacations: Vacations[];
  private vacationsSubscription;

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  start_period: string;
  end_period: string;
  validated: boolean;

  displayedColumns = ['ROWS', 'ANNEE PASSEE', 'ANNEE EN COURS', 'A VENIR'];
  dataSource = [{header: 'Solde', past: 1 , current: 4, upcoming: 25},
                {header: 'Posés', past: 29, current: 1, upcoming: 0},
                {header: 'Total', past: 30, current: 5, upcoming: 25}];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  locale = 'fr';
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  // Evènement par défaut (initialisé dans le ngOnInit() )
  new_event: CalendarEvent = {
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'Empty event',
    color: colors.red,
    actions: null,
    allDay: true,
    resizable: {
      beforeStart: false,
      afterEnd: false
    },
    draggable: false
  };

  // Evènement envoyé par le component, contient un event accompagné de headers
  user_event = {
    did: null,
    status: null,
    name: null,         // Nom utilisateur
    surname: null,      // Prénom utilisateur
    service: null,      // Service de l'utilisateur
    validated: false, // Booléen indiquant si le congé est à valider ou déjà validé
    type: null,         // Type de congé
    date: new Date(), // Date de la demande
    linked_event: this.new_event  // Evenement lié à la demande
  };

  events: CalendarEvent[] = []; // Liste des évènements à afficher sur le calendrier
  activeDayIsOpen = false;      // Détermine l'ouverture de la modale


  constructor(private connectedService: ConnectedService,
    private vacationRequestService: VacationRequestService,
    private vacationsService: VacationsService,
    private modal: NgbModal, private parsingService: ParsingService, private route: ActivatedRoute) {
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    /**
     * Ouverture/fermeture de la modal
     */
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }


  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    /**
     * Gère le changement de date
     */
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }


  saveEvent(state: boolean): void {

    // On vérifie que l'utilisateur a bien saisi les champs requis
    if ((this.user_event.type !== 'Type de congé') && (this.validated === false)) {
      console.log(this.user_event.type);
      // Initialise l'heure de départ en congés
      if (this.start_period === 'Matin') {
        this.new_event.start.setHours(8, 0, 0, 0);
      } else {
        this.new_event.start.setHours(13, 0, 0, 0);
      }

      // Inititialise l'heure de retour de 
      if (this.end_period === 'Matin') {
        this.new_event.end.setHours(8, 0, 0, 0);
      } else {
        this.new_event.end.setHours(13, 0, 0, 0);
      }

      const start: boolean = this.start_period === 'Matin' ? false : true;
      const end: boolean = this.end_period === 'Matin' ? false : true;
      console.log(new Date().toISOString());
      const status = state ? 'En cours de validation 1' : 'Brouillon';
      const newVR: VacationRequest = new VacationRequest(null,
        end,
        this.new_event.end.toISOString(),
        new Date().toISOString(),
        start,
        this.new_event.start.toISOString(),
        status,
        new Date().toISOString(),
        this.connecteduser.uid,
        this.user_event.type);

      this.vacationRequestService.addVacationRequestServer(newVR);

      // Mise à jour de la demande utilisateur (pas nécessaire, mais au cas où):
      this.user_event.linked_event = this.new_event;

      // Rafraîchit le calendrier pour permettre l'affichage du congé demandé
      this.refresh.next();

      // Désactivation du bouton
      // this.validated = true;
      // $('select[id="type_selector"]').attr('disabled', 'disabled');
    }
  }

  ngOnInit() {
    // TODO: Recuperer la vacationRequest via le DID passée par la route
    // vrRonan: VacationRequest = this.vacationRequest.getVacationRequestByDid(did)
    // console.log(vrRonan)

    const did = this.route.snapshot.params['did'];
    this.OwnVacationRequest = this.vacationRequestService.getVacationRequestByDid(+did);
    
    this.connecteduser = this.connectedService.getConnectedUser();

    this.vacationsService.getVacationsByConUserUidFromServer();
    this.vacationsSubscription = this.vacationsService.vacationsSubject.subscribe(
      (vacations: Vacations[]) => {
        this.vacations = vacations;
      }
    );

    this.vacationRequestService.getSelectedVacationRequestListByConUserSidFromServer();
    this.vacationRequestSubscription = this.vacationRequestService.vacationRequestSubject.subscribe(
      (vacationrequests: VacationRequest[]) => {
        this.vacationRequest = vacationrequests;
        this.events = [];

        for (const item of this.parsingService.parseData(this.vacationRequest, true)) {
          this.events.push(item.linked_event);
        }

        this.refresh.next();
      }
    );

    // Initialisation des champs du component
    this.start_period = 'Matin';
    this.end_period = 'Matin';
    this.validated = false;
      
    let vacR: VacationRequest[] = [];
    vacR[0] = this.OwnVacationRequest;

    this.user_event = this.parsingService.parseData(vacR, false)[0];

    // this.user_event = {
    //   did: this.OwnVacationRequest.did,        // did de la demande
    //   status: this.OwnVacationRequest.status,    // status de la demande
    //   name: this.userService.getUserById(this.OwnVacationRequest.uid),         // Nom utilisateur
    //   surname: this.user,      // Prénom utilisateur
    //   service: this.OwnVacationRequest.service,      // Service de l'utilisateur
    //   validated: this.OwnVacationRequest.validated, // Booléen indiquant si le congé est à valider ou déjà validé
    //   type: this.OwnVacationRequest.type,         // Type de congé
    //   date: new Date(), // Date de la demande
    //   linked_event: this.new_event  // Evenement lié à la demande
    // };
    // // Initialisation du nouvel event
    // this.new_event = {
    //   start: startOfDay(new Date()),
    //   end: addDays(new Date(), 1),
    //   title: 'Type de congé',
    //   color: colors.red,
    //   actions: null,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true,
    // };
  }

  ngOnDestroy() {
    this.vacationRequestSubscription.unsubscribe();
    this.vacationsSubscription.unsubscribe();
  }

}
