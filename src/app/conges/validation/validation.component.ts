import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {isSameDay, isSameMonth} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {ConnectedService} from '../../services/connected.service';
import { VacationRequestService } from '../../services/vacation-request.service';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  emptyarray = [];

  displayedColumns = ['NOM', 'FICHE', 'SERVICE', 'TYPE', 'DEPART', 'DMA', 'RETOUR', 'RMA', 'VALIDER', 'REFUSER'];
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

  constructor(private modal: NgbModal, private connectedService: ConnectedService, private holidayrequestService: VacationRequestService) {}

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

  handleRefuseEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalRefuse, { size: 'lg' });
  }

  newFilteredEvents(filter1: any, filter2: any, filter3: any): void {
    /**
     * Filtre les évènements selon 3 filtres:
     * - Etat
     * - Mois
     * - Année
     */
    const eventsList = [];

    for (const event of this.users_events) {
      if (filter1 === '-1' || String(event.linked_event.start.getFullYear()) === filter1) {
        if (filter2 === '-1' || String(event.linked_event.start.getMonth())  === filter2) {
          if (filter3 === 'Service') {
            eventsList.push(event);
          }
          if (event.service === filter3) {
            eventsList.push(event);
          }
        }
      }
    }
    this.dataSource = new MatTableDataSource(eventsList);
  }


  updateEvent(user_event: any, action: string, message: string): void {
    console.log("entering function");
    if (action === 'Valider' || ((action === 'Refuser') && (message.length > 20))) {
      console.log("Processing");
      const index = this.dataSource.data.indexOf(user_event, 0);
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
      }

      this.dataSource.data = this.dataSource.data;
      /*
       * TODO: envoie la structure au back
       */
    }
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
    }

    for (const collaborators_listItem of this.holidayrequestService.collaborators_list) {
      this.events.push(collaborators_listItem.linked_event);
    }

    // Empty filler array
    for (let _i = 0; _i < (30 - this.events.length); _i++) {
      this.emptyarray.push(_i);
    }

    console.log(this.users_events);
    this.dataSource = new MatTableDataSource(this.users_events);
  }

}
