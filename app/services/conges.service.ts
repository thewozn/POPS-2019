import { Injectable } from '@angular/core';
import { ConnectedService } from './connected.service';



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
export class CongesService {


  collaborators_list = {};
  self_conges = [];
  self_conges_en_attente = [];

  constructor(private connectedService: ConnectedService) {
    // Initialise le champ constructor_list suivant les données de users.service.ts
    this.self_conges.push({
      start: new Date(2019, 0, 5, 1, 0, 0, 0),
      end:   new Date(2019, 0, 9, 13, 0, 0, 0),
      title: '[VALIDE] ' + connectedService.nom + connectedService.prenom + ' - RTT du 5/1/2019 (MATIN) au 9/1/2019 (APRES-MIDI)',
      color: colors.self_color,
      actions: null,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    });


    this.collaborators_list = {
      'HERMANN Julien':
        {
          start: new Date(2019, 0, 22, 1, 0, 0, 0),
          end:   new Date(2019, 0, 27, 1, 0, 0, 0),
          title: '[VALIDE] HERMANN Julien - RTT du 22/1/2019 (MATIN) au 27/1/2019 (MATIN)',
          color: colors.colleagues_color,
          actions: null,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true
        },
      'RUPERT Karen':
        {
          start: new Date(2019, 0, 3, 1, 0, 0, 0),
          end:   new Date(2019, 0, 14, 13, 0, 0, 0),
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
    };

    this.self_conges_en_attente = [];
  }
}
