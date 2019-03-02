import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { startOfDay, subDays, addDays, isSameDay, isSameMonth } from 'date-fns';
import { ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import * as $ from 'jquery';
import { Router } from '@angular/router';

import { ConnectedService } from '../../services/connected.service';
import { BalanceService } from '../../services/balance.service';
import { VacationRequestService } from '../../services/vacation-request.service';
import { VacationsService } from '../../services/vacations.service';
import { ParsingService } from '../../services/parsing.service';


import { VacationRequest } from '../../models/vacation-request.model';
import { Vacations } from '../../models/vacations.model';
import { Balance } from '../../models/balance.model';
// Couleur de la nouvelle demande
const colors: any = {
  red: {
    primary: '#c63325',
    secondary: '#c63325'
  }
};

@Component({
  selector: 'app-demander',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demander.component.html',
  styleUrls: ['./demander.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DemanderComponent implements OnInit {
  private vacationRequest: VacationRequest[];
  private vacations: Vacations[];
  private balance: Balance[];
  private dataSource = [];
  private minDate: string;
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  start_period: string;
  end_period: string;
  validated: boolean;

  displayedColumns = ['type', 'solde', 'poses'];

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
    name: null, // Nom utilisateur
    surname: null, // Prénom utilisateur
    service: null, // Service de l'utilisateur
    validated: false, // Booléen indiquant si le congé est à valider ou déjà validé
    type: null, // Type de congé
    date: new Date(), // Date de la demande
    linked_event: this.new_event // Evenement lié à la demande
  };

  events: CalendarEvent[] = []; // Liste des évènements à afficher sur le calendrier
  activeDayIsOpen = false; // Détermine l'ouverture de la modale

  constructor(
    private connectedService: ConnectedService,
    private vacationRequestService: VacationRequestService,
    private vacationsService: VacationsService,
    private modal: NgbModal,
    private parsingService: ParsingService,
    private balanceService: BalanceService,
    private router: Router,
  ) {}

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

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    /**
     * Gère le changement de date
     */
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  saveEvent(state: boolean): void {
    // On vérifie que l'utilisateur a bien saisi les champs requis
    if (this.user_event.type !== 'Type de congé' && this.validated === false) {
      // Initialise l'heure de départ en congés
      if (this.start_period === 'Matin') {
        this.new_event.start.setHours(8, 0, 0, 0);
      } else {
        this.new_event.start.setHours(13, 0, 0, 0);
      }

      // Inititialise l'heure de retour de congés
      if (this.end_period === 'Matin') {
        this.new_event.end.setHours(8, 0, 0, 0);
      } else {
        this.new_event.end.setHours(13, 0, 0, 0);
      }

      const start: boolean = this.start_period === 'Matin' ? false : true;
      const end: boolean = this.end_period === 'Matin' ? false : true;

      const status = state ? 'En cours de validation 1' : 'Brouillon';
      const newVR: VacationRequest = new VacationRequest(
        null,
        end,
        this.new_event.end.toISOString(),
        new Date().toISOString(),
        start,
        this.new_event.start.toISOString(),
        status,
        new Date().toISOString(),
        this.connectedService.getConnectedUser().uid,
        this.user_event.type
      );

      this.vacationRequestService.addVacationRequestServer(newVR).then(
        (response) => {
          this.loadData();
          this.modal.open(this.modalContent, { size: 'sm' });
        },
        (error) => {
          console.log(error);
        }
      );
      // Mise à jour de la demande utilisateur (pas nécessaire, mais au cas où):
      this.user_event.linked_event = this.new_event;

      // Rafraîchit le calendrier pour permettre l'affichage du congé demandé
      this.refresh.next();

      // Désactivation du bouton
      // this.validated = true;
      // $('select[id='type_selector']').attr('disabled', 'disabled');
    }
  }

  ngOnInit() {

    this.loadData();

    const today = new Date();
    today.setDate(today.getDate() + 7);

    // Initialisation des champs du component
    this.start_period = 'Matin';
    this.end_period = 'Matin';
    this.validated = false;

    // Initialisation du nouvel event
    this.new_event = {
      start: startOfDay(today),
      end: addDays(today, 1),
      title: 'Type de congé',
      color: colors.red,
      actions: null,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    };
  }

  loadData() {
    this.vacationsService.getVacationsByConUserUidFromServer().then(
      (response) => {
        this.vacations = response;
        this.user_event.type = this.vacations[0].name;
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );

    this.vacationRequestService.getSelectedVacationRequestListByConUserSidFromServer().then(
      (vrs) => {
        this.vacationRequest = vrs;
        this.events = [];

        for (const item of this.parsingService.parseData(
          this.vacationRequest,
          true
        )) {
          this.events.push(item.linked_event);
        }

        this.refresh.next();

        this.balanceService.getBalanceByUidFromServer().then(
          (balances) => {

            this.balance = balances;
            for (const b of this.balance) {
              let t = 0;
              for (const vr of this.vacationRequest) {
                if (
                  this.vacationsService.getVacationsById(this.vacations, vr.vid).name === b.name
                ) {
                  t +=
                    (new Date(vr.endDate).getTime() -
                      new Date(vr.startDate).getTime()) /
                    (1000 * 3600 * 24);
                }
              }


              this.dataSource.push({
                obj: b,
                taken: t
              });
            }
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
      },
      (error) => {
        console.log('Erreur ! :' + error);
      }
    );
  }

  finishEdit() {
    this.modal.dismissAll();
    this.router.navigate(['conges/historique']);
  }
}
