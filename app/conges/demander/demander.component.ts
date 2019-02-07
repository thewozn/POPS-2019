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
import {CongesService} from '../../services/conges.service';

const colors: any = {
  red: {                    // En attente
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
    /*{
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'RTT collaborateur A - 16 Jan. 2018 Matin | 19 Jan. 2018 AM',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'SS collaborateur B - 17 Jan. 2018 Matin | N.Def',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'RTT collaborateur A - 21 Dec. 2018 | 24 Dec. 2018',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'RTT collaborateur C - 21 Dec. 2018 Matin | N.Def',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }*/
  ];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private connectedService: ConnectedService, private congesService: CongesService) {}

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

  /*addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }*/

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
      this.refresh.next();

      this.validated = true;
      $('select[id="type_selector"]').attr('disabled', 'disabled');
    }
  }

  ngOnInit() {

    this.events = this.congesService.self_conges;
    this.events.concat(this.congesService.self_conges_en_attente);

    for (const event in this.congesService.collaborators_list) {
      this.events.push(this.congesService.collaborators_list[event]);
    }

    this.start_period = 'Matin';
    this.end_period = 'Matin';
    this.validated = false;

    this.prenom = this.connectedService.prenom;
    this.nom = this.connectedService.nom;
    this.srv = this.connectedService.service;
    this.account_type = this.connectedService.account_type;

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
  }

}
