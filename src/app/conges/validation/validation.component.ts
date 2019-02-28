import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MatTableDataSource } from '@angular/material';

import { ConnectedService } from '../../services/connected.service';
import { VacationRequestService } from '../../services/vacation-request.service';
import { UserService } from '../../services/user.service';
import { ServiceService } from '../../services/service.service';
import { VacationsService } from '../../services/vacations.service';
import { ParsingService } from '../../services/parsing.service';

import { VacationRequest } from '../../models/vacation-request.model';
import { User } from '../../models/user.model';
import { Service } from '../../models/service.model';
import { Vacations } from '../../models/vacations.model';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit, OnDestroy {
  private vacationRequest: VacationRequest[];
  vacationRequestSubscription: Subscription;
  private connecteduser: User;

  private user: User[];
  private userSubscription: Subscription;
  private service: Service[];
  private serviceSubscription: Subscription;
  private vacations: Vacations[];
  private vacationsSubscription: Subscription;

  emptyarray = [];

  displayedColumns = [
    'NOM',
    'FICHE',
    'SERVICE',
    'TYPE',
    'DEPART',
    'DMA',
    'RETOUR',
    'RMA',
    'VALIDER',
    'REFUSER'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  @ViewChild('modalRefuse')
  modalRefuse: TemplateRef<any>;

  users_events = [];
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

  constructor(
    private modal: NgbModal,
    private connectedService: ConnectedService,
    private vacationRequestService: VacationRequestService,
    private serviceService: ServiceService,
    private userService: UserService,
    private vacationsService: VacationsService,
    private parsingService: ParsingService
  ) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  handleRefuseEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalRefuse, { size: 'lg' });
  }

  newFilteredEvents(
    filter1: any,
    filter2: any,
    filter3: any,
    filter4: any
  ): void {
    /**
     * Filtre les évènements selon 3 filtres:
     * - Etat
     * - Mois
     * - Année
     */
    const eventsList = [];

    for (const event of this.users_events) {
      if (
        filter1 === '-1' ||
        String(event.linked_event.start.getFullYear()) === filter1
      ) {
        if (
          filter2 === '-1' ||
          String(event.linked_event.start.getMonth()) === filter2
        ) {
          if (filter3 === '') {
            if (filter4 === '') {
              eventsList.push(event);
            }
          }

          if (event.service === filter3) {
            if (filter4 !== '') {
              if (event.type === filter4) {
                eventsList.push(event);
              }
            } else {
              eventsList.push(event);
            }
          }

          if (event.type === filter4) {
            if (filter3 !== '') {
              if (event.service === filter3) {
                eventsList.push(event);
              }
            } else {
              eventsList.push(event);
            }
          }
        }
      }
    }
    this.dataSource = new MatTableDataSource(eventsList);
  }

  updateEvent(user_event: any, action: string, message: string): void {
    if (message.length < 20) {
      let check = false;
      if (action === 'Valider') {
        this.vacationRequestService.approveVacationRequestServer(
          user_event.did
        );
        check = true;
      } else {
        this.vacationRequestService.refuseVacationRequestServer(user_event.did);
        check = true;
      }

      if (check) {
        console.log('Processing');
        const index = this.dataSource.data.indexOf(user_event, 0);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
        }

        this.dataSource.data = this.dataSource.data;
      }
    }
  }

  ngOnInit() {
    let hr;
    this.connecteduser = this.connectedService.getConnectedUser();

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

    this.vacationsService.getVacationsListFromServer();
    this.vacationsSubscription = this.vacationsService.vacationsSubject.subscribe(
      (vacations: Vacations[]) => {
        this.vacations = vacations;
      }
    );

    if (
      this.serviceService.getServiceById(this.connecteduser.sid).name ===
      'HumanResource'
    ) {
      this.vacationRequestService.getVacationRequestsListFromServer();
      console.log('HR');
      hr = true;
    } else {
      this.vacationRequestService.getSelectedVacationRequestListByConUserSidFromServer();
      hr = false;
    }
    this.vacationRequestSubscription = this.vacationRequestService.vacationRequestSubject.subscribe(
      (vacationrequests: VacationRequest[]) => {
        this.vacationRequest = vacationrequests;
        this.events = [];
        for (const item of this.parsingService.parseData(
          this.vacationRequest,
          false
        )) {
          if (
            !(item.name === this.connecteduser.firstName) &&
            !(item.surname === this.connecteduser.lastName)
          ) {
            if (hr) {
              if (item.status !== 'En cours de validation 1') {
                this.events.push(item.linked_event);
                this.users_events.push(item);
              }
            } else {
              if (item.status !== 'En cours de validation 2') {
                this.events.push(item.linked_event);
                this.users_events.push(item);
              }
            }
          }
        }

        for (let _i = 0; _i < 30 - this.events.length; _i++) {
          this.emptyarray.push(_i);
        }

        this.dataSource = new MatTableDataSource(this.users_events);
        this.refresh.next();
      }
    );
  }

  ngOnDestroy() {
    // this.vacationRequestSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
    this.vacationsSubscription.unsubscribe();
  }
}
