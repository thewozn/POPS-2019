import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import {ViewEncapsulation} from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import * as $ from 'jquery';
import {ConnectedService} from '../../services/connected.service';
import {HolidayRequestService} from '../../services/holiday-request.service';

const colors: any = {
  red: {                    // En attente
    primary: '#c63325',
    secondary: '#c63325'
  },

};

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  emptyarray = [];

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  start_period: string;
  end_period: string;
  validated: boolean;
  prenom: string;
  nom: string;
  srv: string;
  account_type: any;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  locale = 'fr';
  modalData: {
    action: string;
    event: CalendarEvent;
  };



  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  new_event: CalendarEvent = {
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'Empty event',
    color: colors.red,
    actions: this.actions,
    allDay: true,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  };

  events: CalendarEvent[] = [
  ];

  activeDayIsOpen = true;

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

  saveEvent(): void {
    const type_conge = this.new_event.title;
    if (((this.new_event.title === 'RTT') || (this.new_event.title === 'Sans solde')) && (this.validated === false)) {
      if (this.start_period === 'Matin') {
        this.new_event.start.setHours(1, 0, 0, 0);
      } else {
        this.new_event.start.setHours(13, 0, 0, 0);
      }
      if (this.end_period === 'Matin') {
        this.new_event.end.setHours(1, 0, 0, 0);
      } else {
        this.new_event.end.setHours(13, 0, 0, 0);
      }

      const mm_s = this.new_event.start.getMonth() + 1;
      const dd_s = this.new_event.start.getDate();
      const yy_s = this.new_event.start.getFullYear();

      const mm_e = this.new_event.end.getMonth() + 1;
      const dd_e = this.new_event.end.getDate();
      const yy_e = this.new_event.end.getFullYear();

      this.new_event.title = ('[EN VALIDATION] ' + this.nom + ' ' + this.prenom + ' - ' +
        this.new_event.title + ' du ' + dd_s + '/' + mm_s + '/' + yy_s + ' ('
        + this.start_period.toUpperCase() + ') au ' + dd_e + '/' + mm_e + '/' + yy_e + ' (' + this.end_period.toUpperCase() + ').');
      this.events.push(this.new_event);
      this.holidayrequestService.self_conges.push(this.new_event);
      this.refresh.next();

      this.validated = true;
      $('select[id="type_selector"]').attr('disabled', 'disabled');
    }
  }

  filteredEvents(month: any): CalendarEvent[] {
    var eventsList = [];

    for(let event of this.events){
      if(event.start.getMonth() == month){
        eventsList.push(event);
      }
    }
    return eventsList;
  }

  newFilteredEvents(filter1: any, filter2: any, filter3: any): CalendarEvent[] {
    var eventsList = [];
    const states = {'2':'REFUSE', '0':'VALIDE', '1':'EN VALIDATION'};

    for(let event of this.events){
      if(filter1 === '-1' || String(event.start.getFullYear()) === filter1){
        if(filter2 === '-1' || String(event.start.getMonth())  === filter2) {
          if(filter3 === '-1') {
            eventsList.push(event);
          }
          if(event.title.indexOf(states[filter3]) > -1){
            eventsList.push(event);
          }
        }
      }
    }


    return eventsList;
  }


  popEvent(): void {

  }

  ngOnInit() {

    for (const event in this.holidayrequestService.collaborators_list_en_attente) {
      this.events.push(this.holidayrequestService.collaborators_list_en_attente[event]);
    }

    for (const event in this.holidayrequestService.self_conges) {
      this.events.push(this.holidayrequestService.self_conges[event]);
    }

    for (const event in this.holidayrequestService.collaborators_list) {
      this.events.push(this.holidayrequestService.collaborators_list[event]);
    }

    this.new_event = {
      start: startOfDay(new Date()),
      end: addDays(new Date(), 1),
      title: 'Type de congé',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    };

    console.log(this.new_event.start);
    this.new_event.start.setHours(1, 0, 0, 0);
    console.log(this.new_event.start);

    for (var _i = 0; _i < (30 - this.events.length); _i++) {
      this.emptyarray.push(_i);
    }
  }

}
