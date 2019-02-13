import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {isSameDay, isSameMonth} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {ConnectedService} from '../../services/connected.service';
import {HolidayRequestService} from '../../services/holiday-request.service';


@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  emptyarray = [];

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

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

  constructor(private modal: NgbModal, private connectedService: ConnectedService, private holidayrequestService: HolidayRequestService) {}

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



  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }



  handleEvent(action: string, event: CalendarEvent): void {
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


  updateEvent(user_event: any): void {
    /**
     * TODO: Met à jour l'event dans la base de données (fait passer validate à true)
     */
  }

  ngOnInit() {
    /**
     * INITIALISATION DU COMPONENT
     */

    for (const collaborators_list_en_attenteItem of this.holidayrequestService.collaborators_list_en_attente) {
      this.events.push(collaborators_list_en_attenteItem.linked_event);
      this.users_events.push(collaborators_list_en_attenteItem);
    }

    for (const self_conge of this.holidayrequestService.self_conges) {
      this.events.push(self_conge.linked_event);
      this.users_events.push(self_conge);
    }

    for (const collaborators_listItem of this.holidayrequestService.collaborators_list) {
      this.events.push(collaborators_listItem.linked_event);
      this.users_events.push(collaborators_listItem);
    }

    // Empty filler array
    for (let _i = 0; _i < (30 - this.events.length); _i++) {
      this.emptyarray.push(_i);
    }
  }

}
