import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {isSameDay, isSameMonth} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {ConnectedService} from '../../services/connected.service';
import { VacationRequestService } from '../../services/vacation-request.service';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  locale = 'fr';
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  emptyarray = [];
  users_events = [];

  constructor(private modal: NgbModal, private connectedService: ConnectedService, private holidayrequestService: VacationRequestService) {}


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
    }
  }


  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }


  handleEvent(action: string, event: CalendarEvent): void {
    /**
     * Affiche la fenêtre modale
     */
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  filteredEvents(month: any): CalendarEvent[] {
    /**
     * Filtre les évènements selon le mois
     */

    const eventsList = [];

    for (const event of this.users_events) {
      if (event.linked_event.start.getMonth() === month) {
        eventsList.push(event);
      }
    }
    return eventsList;
  }


  newFilteredEvents(filter1: any, filter2: any, filter3: any): CalendarEvent[] {
    /**
     * Filtre les évènements selon 3 filtres:
     * - Etat
     * - Mois
     * - Année
     */
    const eventsList = [];
    const states = {'2': 'REFUSE', '0': 'VALIDE', '1': 'EN VALIDATION'};

    for (const event of this.users_events) {
      if (filter1 === '-1' || String(event.linked_event.start.getFullYear()) === filter1) {
        if (filter2 === '-1' || String(event.linked_event.start.getMonth())  === filter2) {
          if (filter3 === '-1') {
            eventsList.push(event);
          }
          if (event.linked_event.title.indexOf(states[filter3]) > -1) {
            eventsList.push(event);
          }
        }
      }
    }
    return eventsList;
  }


  popEvent(event: CalendarEvent): void {
    /**
     * Supprime l'évènement event
     * TODO: MET A JOUR LA BDD
     */
    return;
  }


  ngOnInit() {
    /**
     * INITIALISATION DU COMPONENT
     */

    // Chargement des congés validés ou refusés de l'utilisateur connecté
    for (const self_conge of this.holidayrequestService.self_conges) {
      this.events.push(self_conge.linked_event);
      this.users_events.push(self_conge);
    }

    // Chargement des congés en attente de l'utilisateur connecté
    for (const self_conges_en_attenteItem of this.holidayrequestService.self_conges_en_attente) {
      this.events.push(self_conges_en_attenteItem.linked_event);
      this.users_events.push(self_conges_en_attenteItem);
    }

    // Array utilisée pour remplir le tableau mensuel
    for (let _i = 0; _i < (30 - this.events.length); _i++) {
      this.emptyarray.push(_i);
    }
  }

}
