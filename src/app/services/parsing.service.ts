import { Injectable } from '@angular/core';

import { ConnectedService } from './connected.service';
import { UserService } from './user.service';
import { ServiceService } from './service.service';
import { VacationsService } from './vacations.service';

import { VacationRequest } from '../models/vacation-request.model';
import { User } from '../models/user.model';
import { Service } from '../models/service.model';
import { Vacations } from '../models/vacations.model';

const colors: any = {
  valide: {
    primary: 'green',
    secondary: 'green'
  },
  attente: {
    primary: 'yellow',
    secondary: 'yellow'
  },
  self_color_valide: {
    primary: 'green',
    secondary: 'green'
  },
  self_color_attente: {
    primary: 'yellow',
    secondary: 'yellow'
  },
  brouillon: {
    primary: 'grey',
    secondary: 'grey'
  },
};

@Injectable({
  providedIn: 'root'
})
export class ParsingService {
  private connecteduser: User;
  private connecteduserservice: Service;

  private user: User[];
  private service: Service[];
  private vacations: Vacations[];

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
    private vacationsService: VacationsService,
    private connectedService: ConnectedService
  ) {
    Promise.all([this.userService.getUsersFromServer(),
      this.serviceService.getServicesFromServer(),
      this.vacationsService.getVacationsListFromServer()]).then(
      values => {
        this.user = values[0];
        this.service = values[1];
        this.vacations = values[2];
      }
    );
  }

  parseData(brutData: VacationRequest[], check: boolean) {
    this.connecteduser = this.connectedService.getConnectedUser();
    this.connecteduserservice = this.connectedService.getConnectedUserService();
    while (this.connecteduser === undefined || this.connecteduserservice === undefined) {
      this.connecteduser = this.connectedService.getConnectedUser();
      this.connecteduserservice = this.connectedService.getConnectedUserService();
    }

    const parsedData = [];
    for (const vr of brutData) {
      const user = this.userService.getUserById(this.user, vr.uid);
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
        service: this.serviceService.getServiceById(this.service, user.sid),
        validated: true,
        type: this.vacationsService.getVacationsById(this.vacations, vr.vid),
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
            this.vacationsService.getVacationsById(this.vacations, vr.vid).name +
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

  filterData(brutData: VacationRequest[], check: boolean) {
    this.connecteduser = this.connectedService.getConnectedUser();
    this.connecteduserservice = this.connectedService.getConnectedUserService();
    while (this.connecteduser === undefined || this.connecteduserservice === undefined) {
      this.connecteduser = this.connectedService.getConnectedUser();
      this.connecteduserservice = this.connectedService.getConnectedUserService();
    }


    const filteredData: VacationRequest[] = [];
    if (this.connecteduserservice.name === 'HumanResource') {
      if (this.connecteduser.status === 'HeadOfService') {
        // DRH
        for (const vr of brutData) {
          const user = this.userService.getUserById(this.user, vr.uid);
          if (vr.status !== 'Brouillon' && vr.status !== 'Annulée') {
            if (user.sid === this.connecteduser.sid || this.serviceService.getServiceById(this.service, user.sid).name === 'Management') {
              filteredData.push(vr);
            } else if (vr.status !== 'En cours de validation 1') {
              filteredData.push(vr);
            }
          }
        }
      } else {
        // RH
        for (const vr of brutData) {
          const user = this.userService.getUserById(this.user, vr.uid);
          if (this.serviceService.getServiceById(this.service, user.sid).name !== 'Management' &&
            this.serviceService.getServiceById(this.service, user.sid).name !== 'HumanResource') {
            if (vr.status !== 'En cours de validation 1' && vr.status !== 'Brouillon' && vr.status !== 'Annulée') {
              filteredData.push(vr);
            }
          }
        }
      }
    } else if (this.connecteduser.status === 'HeadOfService' && this.connecteduserservice.name !== 'Management') {
      // CS
      for (const vr of brutData) {
        const user = this.userService.getUserById(this.user, vr.uid);

        if (user.sid === this.connecteduser.sid) {
          if (vr.status !== 'En cours de validation 2' && vr.status !== 'Brouillon' && vr.status !== 'Annulée') {
            filteredData.push(vr);
          }
        }
      }
    } else {
      // CEO
      for (const vr of brutData) {
        const user = this.userService.getUserById(this.user, vr.uid);
        if (vr.status !== 'Brouillon' && vr.status !== 'Annulée') {
          if (user.status === 'HeadOfService') {
            if (this.serviceService.getServiceById(this.service, user.sid).name === 'HumanResource') {
              filteredData.push(vr);
            } else if (vr.status !== 'En cours de validation 2') {
              filteredData.push(vr);
            }
          }
        }
      }
    }


    return this.parseData(filteredData, check);
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
