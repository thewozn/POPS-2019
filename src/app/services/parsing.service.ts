import { Injectable } from '@angular/core';

import { ConnectedService } from './connected.service';
import { UserService } from './user.service';
import { ServiceService } from './service.service';
import { VacationsService } from './vacations.service';

import { VacationRequest } from '../models/vacation-request.model';
import { User } from '../models/user.model';

const colors: any = {
  valide: {
    primary: '#157ab5',
    secondary: '#FAE3E3'
  },
  attente: {
    primary: '#081d3a',
    secondary: '#FDF1BA'
  },
  self_color_valide: {
    primary: '#c63325',
    secondary: '#c63325'
  },
  self_color_attente: {
    primary: '#c63325',
    secondary: '#c63325'
  },
  brouillon: {
    primary: '#c63325',
    secondary: '#c63325'
  },
};

@Injectable({
  providedIn: 'root'
})
export class ParsingService {
  private connecteduser: User;

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
    private vacationsService: VacationsService,
    private connectedService: ConnectedService
  ) {
    this.userService.getUsersFromServer();
    this.serviceService.getServicesFromServer();
    this.vacationsService.getVacationsListFromServer();
  }

  parseData(brutData: VacationRequest[], check: boolean) {
    while (this.connecteduser === undefined) {
      this.connecteduser = this.connectedService.getConnectedUser();
    }

    const parsedData = [];
    for (const vr of brutData) {
      const user = this.userService.getUserById(vr.uid);
      let firstName;
      let lastName;
      if (
        vr.uid !== this.connecteduser.uid &&
        vr.status !== 'Validée' &&
        check
      ) {
        firstName = 'Anonyme';
        lastName = 'Anonyme';
      } else {
        firstName = user.firstName;
        lastName = user.lastName;
      }

      parsedData.push({
        did: vr.did,
        status: vr.status,
        name: firstName,
        surname: lastName,
        service: this.serviceService.getServiceById(user.sid),
        validated: true,
        type: this.vacationsService.getVacationsById(vr.vid),
        date: new Date(vr.requestDate),
        linked_event: {
          start: new Date(vr.startDate),
          end: new Date(vr.endDate),
          title:
            '[' +
            vr.status +
            ']' +
            lastName +
            ' ' +
            firstName +
            ' - ' +
            this.vacationsService.getVacationsById(vr.vid).name +
            ' du ' +
            vr.startDate.substr(8, 2) +
            '/' +
            vr.startDate.substr(5, 2) +
            '/' +
            vr.startDate.substr(0, 4) +
            ' ' +
            this.getValueDemiJ(vr.start) +
            ' au ' +
            vr.endDate.substr(8, 2) +
            '/' +
            vr.endDate.substr(5, 2) +
            '/' +
            vr.endDate.substr(0, 4) +
            ' ' +
            this.getValueDemiJ(vr.end),
          color: this.getColor(vr),
          actions: null,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: false
        }
      });
    }

    return parsedData;
  }

  getValueDemiJ(data) {
    return data ? '(APRES-MIDI)' : '(MATIN)';
  }

  getColor(vacationRequest: VacationRequest) {
    if (vacationRequest.status === 'Brouillon') {
      return colors.brouillon;
    } else if (vacationRequest.status === 'Validée') {
      return vacationRequest.uid === this.connecteduser.uid ? colors.self_color_valide : colors.valide;
    } else {
      return vacationRequest.uid === this.connecteduser.uid ? colors.self_color_attente : colors.attente;
    }
  }
}
