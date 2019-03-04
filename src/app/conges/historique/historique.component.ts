import {Component, OnInit, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

import { ConnectedService } from '../../services/connected.service';
import { VacationRequestService } from '../../services/vacation-request.service';
import { ParsingService } from '../../services/parsing.service';

import { VacationRequest } from '../../models/vacation-request.model';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  colors = {
    'Brouillon': '#DBFCFF',
    'Annulée': '#F0EFEE',
    'Validée': '#B8FFA6',
    'Refusée': '#FFBBBB',
    'En cours de validation 1': '#FFDEBF',
    'En cours de validation 2': '#F6FCAB',
  };

  private vacationRequest: VacationRequest[];

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  displayedColumns = ['DATE', 'TYPE', 'DEPART', 'DMA', 'RETOUR', 'RMA', 'STATUT', 'ANNULER', 'EDITER', 'SUPPRIMER'];
  dataSource = new MatTableDataSource();

  viewDate: Date = new Date();
  locale = 'fr';
  modalData: {
    action: string;
    did: number;
  };

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  users_events = [];

  constructor(private modal: NgbModal, private connectedService: ConnectedService,
    private vacationRequestService: VacationRequestService,
    private parsingService: ParsingService, private router: Router) {

  }


  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.vacationRequestService.getVacationRequestsByConUserUidFromServer().then(
      (response) => {
        this.vacationRequest = response;
        this.users_events = [];

        console.log(this.vacationRequest);
        this.genData();

        this.refresh.next();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  genData() {
    for (const item of this.parsingService.parseData(this.vacationRequest, false)) {
      if (item.status !== 'Annulée' && item.status !== 'Refusée') {
        this.events.push(item.linked_event);
      }
      this.users_events.push(item);
    }

    this.dataSource = new MatTableDataSource(this.users_events);
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


  handleEvent(did: number,  action: string): void {
    console.log(action);
    if (action === 'edit') {
      this.editRequest(did);
    } else {
      this.modalData = { action, did };
      this.modal.open(this.modalContent, { size: 'sm' });
    }
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
    const eventsList = [];
    const states = {'0': 'Brouillon', '1': 'En cours de validation 1', '2': 'En cours de validation 2', '3': 'Validée', '4': 'Refusée'};

    for (const event of this.users_events) {
      if (filter1 === '-1' || String(event.linked_event.start.getFullYear()) === filter1) {
        if (filter2 === '-1' || String(event.linked_event.start.getMonth())  === filter2) {
          if (filter3 === '-1') {
            eventsList.push(event);
          }
          if (event.status.indexOf(states[filter3]) > -1) {
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

  cancelRequest(did: number) {
    this.vacationRequestService.cancelVacationRequestServer(did).then(
        (response) => {
        this.loadData();
        this.modal.dismissAll();
        },
        (error) => {
          console.log('Erreur ! : ' + error.message);
        }
    );
  }

  removeRequest(did: number) {
    this.vacationRequestService.removeVacationRequestServer(did).then(
      (response) => {
        this.loadData();
        this.modal.dismissAll();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );

  }

  editRequest(id: number) {
    this.router.navigate(['conges/editerconges', {did: id}]);

    this.modal.dismissAll();
  }

  modalValid(did: number, action: string) {
    if (action === 'cancel') {
      this.cancelRequest(did);
    } else {
      this.removeRequest(did);
    }
  }
}
