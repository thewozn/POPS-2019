import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import {startOfDay, subDays, addDays, isSameDay, isSameMonth} from 'date-fns';
import {ViewEncapsulation} from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import * as $ from 'jquery';
import {ConnectedService} from '../../services/connected.service';
import {VacationRequestService} from '../../services/vacation-request.service';



// Couleur de la nouvelle demande
const colors: any = {
  red: {
    primary: '#c63325',
    secondary: '#c63325'
  },
};


@Component({
  selector: 'app-demander',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demander.component.html',
  styleUrls: ['./demander.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DemanderComponent implements OnInit {

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  start_period: string;
  end_period: string;
  validated: boolean;
  prenom: string;
  nom: string;
  srv: string;
  account_type: any;

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
    name: '',         // Nom utilisateur
    surname: '',      // Prénom utilisateur
    service: '',      // Service de l'utilisateur
    validated: false, // Booléen indiquant si le congé est à valider ou déjà validé
    type: '',         // Type de congé
    date: new Date(), // Date de la demande
    linked_event: this.new_event  // Evenement lié à la demande
  };

  events: CalendarEvent[] = []; // Liste des évènements à afficher sur le calendrier
  activeDayIsOpen = false;      // Détermine l'ouverture de la modale


  constructor(private modal: NgbModal, private connectedService: ConnectedService, private holidayrequestService: VacationRequestService) {}


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


  saveEvent(): void {
    /**
     * Initialise les champs du nouvel évènement et appelle le service
     * holiday-request pour la mise à jour.
     */

    // On vérifie que l'utilisateur a bien saisi les champs requis
    if (((this.user_event.type === 'RTT') || (this.user_event.type === 'Sans solde')) && (this.validated === false)) {

      // Initialise l'heure de départ en congés
      if (this.start_period === 'Matin') {
        this.new_event.start.setHours(1, 0, 0, 0);
      } else {
        this.new_event.start.setHours(13, 0, 0, 0);
      }

      // Inititialise l'heure de retour de congés
      if (this.end_period === 'Matin') {
        this.new_event.end.setHours(1, 0, 0, 0);
      } else {
        this.new_event.end.setHours(13, 0, 0, 0);
      }

      // Récupération des informations relatives aux dates
      const mm_s = this.new_event.start.getMonth() + 1;
      const dd_s = this.new_event.start.getDate();
      const yy_s = this.new_event.start.getFullYear();

      const mm_e = this.new_event.end.getMonth() + 1;
      const dd_e = this.new_event.end.getDate();
      const yy_e = this.new_event.end.getFullYear();

      // Génération d'un titre pour le congé
      this.new_event.title = ('[EN VALIDATION] ' + this.nom + ' ' + this.prenom + ' - ' +
         this.user_event.type + ' du ' + dd_s + '/' + mm_s + '/' + yy_s + ' ('
        + this.start_period.toUpperCase() + ') au ' + dd_e + '/' + mm_e + '/' + yy_e + ' (' + this.end_period.toUpperCase() + ').');

      // Ajoute théoriquement aux évènements
      this.events.push(this.new_event);

      // Mise à jour de la demande utilisateur (pas nécessaire, mais au cas où):
      this.user_event.linked_event = this.new_event;

      /**
       * TODO: ENVOYER AU BACK DANS CETTE PARTIE
       */

      // Rafraîchit le calendrier pour permettre l'affichage du congé demandé
      this.refresh.next();

      // Désactivation du bouton
      this.validated = true;
      $('select[id="type_selector"]').attr('disabled', 'disabled');
    }
  }


  ngOnInit() {
    /**
     * INITIALISATION DU COMPONENT
     */

    // Chargement des congés validés et refusés de l'employé
    for (const self_conge of this.holidayrequestService.self_conges) {
      this.events.push(self_conge.linked_event);
    }
    // Chargement des congés en attente de l'employé
    for (const self_conges_en_attenteItem of this.holidayrequestService.self_conges_en_attente) {
      this.events.push(self_conges_en_attenteItem.linked_event);
    }
    // Chargement des congés validés et refusé des collaborateurs
    for (const collaborators_listItem of this.holidayrequestService.collaborators_list) {
      this.events.push(collaborators_listItem.linked_event);
    }

    // Initialisation des champs du component
    this.start_period = 'Matin';
    this.end_period = 'Matin';
    this.validated = false;
    this.prenom = this.connectedService.prenom;
    this.nom = this.connectedService.nom;
    this.srv = this.connectedService.service;
    this.account_type = this.connectedService.account_type;

    // Initialisation du nouvel event
    this.new_event = {
      start: startOfDay(new Date()),
      end: addDays(new Date(), 1),
      title: 'Type de congé',
      color: colors.red,
      actions: null,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
    };

    this.new_event.start.setHours(1, 0, 0, 0);

    // Création d'un service
    this.user_event = {
      name: this.prenom,
      surname: this.nom,
      service: this.srv,
      validated: false,
      type: 'Type de congé',
      date: new Date(),
      linked_event: this.new_event
    };
  }
}
