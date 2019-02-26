import {Component, OnInit, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {MatTableDataSource} from '@angular/material';
import {Employee} from '../../missions/creer/creer.component';

import { ConnectedService } from '../../services/connected.service';
import { VacationRequestService } from '../../services/vacation-request.service';
import { UserService } from '../../services/user.service';
import { ServiceService } from '../../services/service.service';

import { VacationRequest } from '../../models/vacation-request.model';
import { User } from '../../models/user.model';
import { Service } from '../../models/service.model';

const colors: any = {
  colleagues_color: {          // Waiting
    primary: '#157ab5',
    secondary: '#FAE3E3'
  },
  self_color: {
    primary: '#13468c',
    secondary: '#D1E8FF'
  },
  waiting_color: {
    primary: '#081d3a',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit, OnDestroy {
  private vacationRequest: VacationRequest[];
  vacationRequestSubscription: Subscription;
  private connecteduser: User;

  private user: User[];
  private userSubscription: Subscription;
  private service: Service[];
  private serviceSubscription: Subscription;

  private data;
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  displayedColumns = ['DATE', 'TYPE', 'DEPART', 'DMA', 'RETOUR', 'RMA', 'STATUT', 'ACTION'];
  dataSource = new MatTableDataSource();

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

  constructor(private modal: NgbModal, private userService: UserService, private serviceService: ServiceService,
    private connectedService: ConnectedService, private vacationRequestService: VacationRequestService) {
    this.connecteduser = this.connectedService.getConnectedUser();
  }

  ngOnInit() {
    this.userService.getUsersFromServer();
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.user = users;
      }
    );

    this.serviceService.getServicesFromServer();
    this.serviceSubscription = this.serviceService.serviceSubject.subscribe(
      (services: Service[]) => {
        this.service = services;
      }
    );

    this.vacationRequestService.getVacationRequestsList();
    this.vacationRequestSubscription = this.vacationRequestService.vacationRequestSubject.subscribe(
      (vacationrequests: VacationRequest[]) => {
        this.vacationRequest = vacationrequests;
        this.parseData(this.vacationRequest);

        for (const item of this.data) {
          this.events.push(item.linked_event);
          this.users_events.push(item);
        }

        for (let _i = 0; _i < (30 - this.events.length); _i++) {
          this.emptyarray.push(_i);
        }

        this.dataSource = new MatTableDataSource(this.users_events);
      }
    );


    /**
     * INITIALISATION DU COMPONENT
     */

    this.dataSource.filterPredicate =
      (data: Employee, filters: string) => {
        const matchFilter = [];
        const filterArray = filters.split('+');
        const columns = (<any>Object).values(data);
        // OR be more specific [data.name, data.race, data.color];

        // Main
        filterArray.forEach(filter => {
          const customFilter = [];
          columns.forEach(column => customFilter.push(column.toLowerCase().includes(filter)));
          matchFilter.push(customFilter.some(Boolean)); // OR
        });
        return matchFilter.every(Boolean); // AND
      };

    // Array utilisée pour remplir le tableau mensuel

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


  newFilteredEvents(filter1: any, filter2: any, filter3: any): void {
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
    this.dataSource = new MatTableDataSource(eventsList);
  }


  popEvent(event: CalendarEvent): void {
    /**
     * Supprime l'évènement event
     * TODO: MET A JOUR LA BDD
     */
    return;
  }

  // TODO: Récupérer le type de congés
  parseData(brutData: VacationRequest[]) {
    const parsedData = [];
    for (const vr of brutData) {
      if (vr.uid === this.connecteduser.uid) {
      const user = this.userService.getUserById(vr.uid);
      parsedData.push(
        {
          name: user.firstName,
          surname: user.lastName,
          service: this.serviceService.getServiceById(user.sid),
          validated: true,
          type: 'TODO',
          date: this.parseIntoDate(vr.requestDate),
          linked_event:
          {
            start: this.parseIntoDate(vr.startDate),
            end: this.parseIntoDate(vr.endDate),
            title: '[' + vr.status + ']' + user.lastName + ' ' + user.firstName
              + ' - TODO du ' + vr.startDate.substr(8, 2) + '/' + vr.startDate.substr(5, 2) + '/' + vr.startDate.substr(0, 4) +
              ' (MATIN) au ' + vr.endDate.substr(8, 2) + '/' + vr.endDate.substr(5, 2) + '/' + vr.endDate.substr(0, 4) + ' (APRES-MIDI)',
            color: colors.self_color,
            actions: null,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          }
        }
      );
      }
    }

    this.data = parsedData;
  }

  parseIntoDate(date: string): Date {
    return new Date(parseInt(date.substr(0, 4)), (parseInt(date.substr(5, 2)) - 1), parseInt(date.substr(8, 2)), 0, 0, 0, 0)
  }

  ngOnDestroy() {
    this.vacationRequestSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
  }
}
