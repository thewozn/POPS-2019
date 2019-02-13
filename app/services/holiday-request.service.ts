import { Injectable } from '@angular/core';
import { ConnectedService } from './connected.service';


/**
 * Affectation de codes couleurs aux différents types d'évènements.
 * colleagues color si cela concerne les collègues
 * self_color si cela concerne l'employé connecté
 * waiting_color si cela concerne les congés en attente de l'employé connecté
 */
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

@Injectable()
export class HolidayRequestService {


  collaborators_list = [];            // Liste des congés validés ou refusés des collaborateurs
  collaborators_list_en_attente = []; // Liste des congés en attente des collaborateurs
  self_conges = [];                   // Liste des congés validés ou refusés de l'employé connecté
  self_conges_en_attente = [];        // Liste des congés en attente de l'employé connecté

  constructor(private connectedService: ConnectedService) {
    /**
     * Initialise les champs relatifs aux congés
     * /!\ POUR LE MOMENT, IL S'AGIT DE DONNEES BRUTES
     */
    this.self_conges = [
      {
        name: 'Didier',
        surname: 'LEBLANC',
        service: 'RH',
        validated: true,
        type: 'Sans solde',
        date: new Date(2019, 0, 1, 1, 0, 0, 0),
        linked_event:
          {
            start: new Date(2019, 0, 5, 1, 0, 0, 0),
            end: new Date(2019, 0, 9, 13, 0, 0, 0),
            title: '[VALIDE] ' + connectedService.nom + ' ' + connectedService.prenom
              + ' - Sans solde du 5/1/2019 (MATIN) au 9/1/2019 (APRES-MIDI)',
            color: colors.self_color,
            actions: null,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          }
          },
      {
        name: 'Didier',
        surname: 'LEBLANC',
        service: 'RH',
        validated: true,
        type: 'RTT',
        date: new Date(2019, 0, 1, 1, 0, 0, 0),
        linked_event:
          {
            start: new Date(2019, 1, 5, 1, 0, 0, 0),
            end: new Date(2019, 1, 9, 13, 0, 0, 0),
            title: '[REFUSE] ' + connectedService.nom + ' ' + connectedService.prenom
              + ' - RTT du 5/2/2019 (MATIN) au 9/2/2019 (APRES-MIDI)',
            color: colors.self_color,
            actions: null,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          }
          },
      {
        name: 'Didier',
        surname: 'LEBLANC',
        service: 'RH',
        validated: true,
        type: 'RTT',
        date: new Date(2017, 11, 22, 1, 0, 0, 0),
        linked_event:
          {
            start: new Date(2018, 1, 5, 1, 0, 0, 0),
            end: new Date(2018, 1, 9, 13, 0, 0, 0),
            title: '[VALIDE] ' + connectedService.nom + ' ' + connectedService.prenom
              + ' - RTT du 5/2/2018 (MATIN) au 9/2/2018 (APRES-MIDI)',
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
      ];
    this.collaborators_list = [
      {
        name: 'Julien',
        surname: 'HERMANN',
        service: 'Finance',
        validated: true,
        type: 'RTT',
        date: new Date(2019, 0, 13, 1, 0, 0, 0),
        linked_event:
          {
            start: new Date(2019, 0, 22, 1, 0, 0, 0),
            end: new Date(2019, 0, 27, 1, 0, 0, 0),
            title: '[VALIDE] HERMANN Julien - RTT du 22/1/2019 (MATIN) au 27/1/2019 (MATIN)',
            color: colors.colleagues_color,
            actions: null,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          }
          },
      {
        name: 'Karen',
        surname: 'RUPERT',
        service: 'Logistique',
        validated: true,
        type: 'RTT',
        date: new Date(2018, 11, 30, 1, 0, 0, 0),
        linked_event:
          {
            start: new Date(2019, 0, 3, 1, 0, 0, 0),
            end: new Date(2019, 0, 14, 13, 0, 0, 0),
            title: '[VALIDE] RUPERT Karen - RTT du 3/1/2019 (MATIN) au 14/1/2019 (APRES-MIDI)',
            color: colors.colleagues_color,
            actions: null,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          }
      }
      ];
    this.self_conges_en_attente = [
      {
        name: 'Didier',
        surname: 'LEBLANC',
        service: 'RH',
        validated: false,
        type: 'RTT',
        date: new Date(2019, 0, 11, 1, 0, 0, 0),
        linked_event:
          {
            start: new Date(2019, 1, 16, 1, 0, 0, 0),
            end: new Date(2019, 1, 22, 13, 0, 0, 0),
            title: '[EN VALIDATION] ' + connectedService.nom + ' ' + connectedService.prenom
              + ' - RTT du 16/2/2019 (MATIN) au 22/2/2019 (APRES-MIDI)',
            color: colors.waiting_color,
            actions: null,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          }
      }
      ];
    this.collaborators_list_en_attente = [
      {
        name: 'Thomas',
        surname: 'ORANGE',
        service: 'Enfumage',
        validated: false,
        type: 'RTT',
        date: new Date(2019, 0, 29, 1, 0, 0, 0),
        linked_event:
          {
            start: new Date(2019, 1, 16, 1, 0, 0, 0),
            end: new Date(2019, 1, 22, 13, 0, 0, 0),
            title: '[EN VALIDATION] ORANGE Thomas - RTT du 16/2/2019 (MATIN) au 22/2/2019 (APRES-MIDI)',
            color: colors.waiting_color,
            actions: null,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true
          }
      }
      ];
  }
}
