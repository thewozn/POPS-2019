import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../services/global.service';
import { ConnectedService } from '../services/connected.service';
import { Mission } from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  missions_list = [];
  user_missions = [];

  constructor(private httpclient: HttpClient, private globalService: GlobalService, private connectedService: ConnectedService) {
    this.missions_list = [
      {
        id: '02T6S2',
        name: 'Machine Learning',
        collaborators: []
      },
      {
        id: '90J3D3',
        name: 'VR Project',
        collaborators: []
      },
      {
        id: '782HSD',
        name: 'Transformation Digitale',
        collaborators: []
      },
      {
        id: '029D2D',
        name: 'Approvisionnement Café',
        collaborators: []
      }
    ];

    this.user_missions = [
      {
        id: '02T6S2',
        name: 'Machine Learning',
        collaborators: []
      },
      {
        id: '90J3D3',
        name: 'VR Project',
        collaborators: []
      },
      {
        id: '782HSD',
        name: 'Transformation Digitale',
        collaborators: []
      },
      {
        id: '029D2D',
        name: 'Approvisionnement Café',
        collaborators: []
      }
    ];
  }

  // Methode permettant de recuperer une mission pour le Head Of Service
  async getMissionsByConUserSidFromServer() {
    return await this.httpclient.get<Mission[]>(this.globalService.getbaseUrl() + '/getMissionBySID/' +
      this.connectedService.getConnectedUser().sid).toPromise();
  }

  async getMissionByMidFromServer(mid: number) {
    return await this.httpclient.get<Mission>(this.globalService.getbaseUrl() + '/getMissionByMid/' + mid).toPromise();
  }

  // Methode permettant de recuperer une mission pour un collaborateur autre que le Head Of Service
  // Ne renvoit que les missions de l'utilisateur en fonction de son uid
 async getMissionsByConUserUidFromServer() {
   return await this.httpclient.get<Mission[]>(this.globalService.getbaseUrl() + '/getMissionByUID/' +
      this.connectedService.getConnectedUser().uid).toPromise();
  }

  async addMissionFromServer(mission: Mission) {
    return await this.httpclient.post<Mission>(this.globalService.getbaseUrl() + '/createMission', JSON.stringify(mission),
      this.globalService.gethttpOptions()).toPromise();
  }

  async affectUserToMissionFromServer(mid: number, uid: number) {
    return await this.httpclient.post<Mission>(this.globalService.getbaseUrl() +
      '/affectUserToMission' + '/' + mid + '/' + uid,
      this.globalService.gethttpOptions()).toPromise();
  }

  async updateMissionFromServer(mission: Mission) {
    return await this.httpclient.patch<Mission>(this.globalService.getbaseUrl() + '/updateMission',
    JSON.stringify(mission), this.globalService.gethttpOptions()).toPromise();
  }

  async removeMissionFromServer(mid: number) {
    return await this.httpclient.delete<Mission>(this.globalService.getbaseUrl() + '/deleteMission/' + mid,
    this.globalService.gethttpOptions()).toPromise();
  }

  async acceptUserRequestedForMissionFromServer(mid: number, uid: number) {
    return await this.httpclient.patch<Mission>(this.globalService.getbaseUrl() + '/acceptUserRequestedForMission/' + mid + '/' + uid,
    this.globalService.gethttpOptions()).toPromise();
  }

  async refuseUserRequestedForMissionFromServer(mid: number, uid: number) {
    return await this.httpclient.patch<Mission>(this.globalService.getbaseUrl() + '/refuseUserRequestedForMission/' + mid + '/' + uid,
      this.globalService.gethttpOptions()).toPromise();
  }
}
