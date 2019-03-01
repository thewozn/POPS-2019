import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

import { ConnectedService } from './../../services/connected.service';
import { MissionService } from './../../services/mission.service';

import { Mission } from './../../models/mission.model';
import { User } from './../../models/user.model';
import { useAnimation } from '@angular/animations';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

const testMissions: Mission[] = [
  {
    mid: 1,
    description: 'Mission Big Data',
    status: 'ok',
    title: 'test',
    sid: 3,
    users: null,
    usersSub: null
  },
  {
    mid: 2,
    description: 'Mission C++',
    status: 'ok',
    title: 'test',
    sid: 3,
    users: null,
    usersSub: null
  },
  {
    mid: 1,
    description: 'Mission Obj',
    status: '*ok',
    title: '*test',
    sid: 3,
    users: null,
    usersSub: null
  },
  {
    mid: 1,
    description: 'Mission OPL',
    status: 'ok',
    title: 'test',
    sid: 3,
    users: null,
    usersSub: null
  }
];

export interface Statut {
  name: string;
}

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit {
  connecteduser: User;
  mission: Mission[];

  userMissionSubscription: Subscription;
  missionSubscription: Subscription;

  dateToConvert: Date;
  convertedDateString: string;

  constructor(
    private connectedService: ConnectedService,
    private missionService: MissionService
  ) {
    this.connecteduser = this.connectedService.getConnectedUser();
  }

  displayedColumns: string[] = ['mid', 'description', 'status', 'title', 'sid'];
  missions = new MatTableDataSource(testMissions);
  toppings = new FormControl();
  toppingList: string[] = [
    'Jean Marie',
    'Jose',
    'Marc',
    'Pierre',
    'Andre',
    'Sandra'
  ];

  statutControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  statuts: Statut[] = [
    { name: 'En Cours' },
    { name: 'Valide' },
    { name: 'Refus' }
  ];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  //   this.missions.sort = this.sort;
  //   // on recupere les missions
  //   this.missionService.getMissionsFromServer();

  //   // 1. On souscrit aux missions
  //   this.missionSubscription = this.missionService.missionSubject.subscribe(
  //     (missions: Mission[]) => {
  //       this.mission = missions;
  //     }
  //   );
  // }
  //  generateMission(){
  //   //Creation d'un tableau avec l'ensemble des missions a afficher
  //   reponses: const[];
  //   mid: Int ;
  //    if(this.connecteduser.status=='Head Of Service'){
  //        //il s'agit d'un Chef de Service
  //         for(usm in userMission){
  //             if(this.connecteduser.sid===usm.sid){
  //                 // reponses.push();
  //                 mid = usm.mid;
  //             }
  //         }
  //         for(mis in Mission){
  //             if( mis.mid === mid){
  //               reponses.push(mis);
  //             }
  //         }
  //       }
  //     }
  //     else{
  //       for(usm:UserMission in userMission){
  //         if(this.connecteduser.uid === usm.uid){
  //           mid = usm.mid;
  //         }
  //        }
  //       for(mis in Mission){
  //         if( mis.mid === mid){
  //           reponses.push(mis);
  //         }
  //       }
  //     }
  //   }
  // Instanciation d'un tableau de reponses contenant les missions du collaborateur
  // }
}
}
