import {Component, OnInit, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {MatTableDataSource} from '@angular/material';

import { ConnectedService } from '../../services/connected.service';
import { VacationRequestService } from '../../services/vacation-request.service';
import { ParsingService } from '../../services/parsing.service';

import { VacationRequest } from '../../models/vacation-request.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit, OnDestroy {
  private vacationRequest: VacationRequest[];
  vacationRequestSubscription: Subscription;

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  displayedColumns = ['DATE', 'TYPE', 'DEPART', 'DMA', 'RETOUR', 'RMA', 'STATUT', 'ACTION'];
  dataSource = new MatTableDataSource();

  viewDate: Date = new Date();
  locale = 'fr';
  modalData: {
    title: string;
    did: number;
    status: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  emptyarray = [];
  users_events = [];

  constructor(private modal: NgbModal, private connectedService: ConnectedService,
    private vacationRequestService: VacationRequestService,
    private parsingService: ParsingService) {

  }

  ngOnInit() {
    this.vacationRequestService.getVacationRequestsByConUserUidFromServer();
    this.vacationRequestSubscription = this.vacationRequestService.vacationRequestSubject.subscribe(
      (vacationrequests: VacationRequest[]) => {
        this.vacationRequest = vacationrequests;
        for (const item of this.parsingService.parseData(this.vacationRequest, false)) {
          this.events.push(item.linked_event);
          this.users_events.push(item);
        }

        for (let _i = 0; _i < (30 - this.events.length); _i++) {
          this.emptyarray.push(_i);
        }

        this.dataSource = new MatTableDataSource(this.users_events);
      }
    );
  }

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
    // this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }


  handleEvent(title: string, did: number, status: string, event: CalendarEvent): void {
    /**
     * Affiche la fenêtre modale
     */
    this.modalData = { title, did, status, event };
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


  newFilteredEvents(filter1: any, filter2: any, filter3: any): void {
    /**
     * Filtre les évènements selon 3 filtres:
     * - Etat
     * - Mois
     * - Année
     */
    const eventsList = [];
    const states = {'0': 'Brouillon', '1': 'En cours de validation 1', '2': 'En cours de validation 2', '3': 'Validée'};

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
    this.dataSource = new MatTableDataSource(eventsList);
  }


  popEvent(event: CalendarEvent): void {
    /**
     * Supprime l'évènement event
     * TODO: MET A JOUR LA BDD
     */
    return;
  }

  ngOnDestroy() {
    this.vacationRequestSubscription.unsubscribe();
  }
}
