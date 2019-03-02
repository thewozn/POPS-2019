import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../services/global.service';
import { ConnectedService } from '../services/connected.service';
import { Mission } from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  constructor(private httpclient: HttpClient, private globalService: GlobalService, private connectedService: ConnectedService) { }

  // Methode permettant de recuperer une mission pour le Head Of Service
  async getMissionsByConUserSidFromServer() {
    return await this.httpclient.get<Mission[]>(this.globalService.getbaseUrl() + '/getMissionBySID/' +
      this.connectedService.getConnectedUser().sid).toPromise();
  }

  // Methode permettant de recuperer une mission pour un collaborateur autre que le Head Of Service
  // Ne renvoit que les missions de l'utilisateur en fonction de son uid
 async getMissionsByConUserUidFromServer() {
   return await this.httpclient.get<Mission[]>(this.globalService.getbaseUrl() + '/getMissionByUID/' +
      this.connectedService.getConnectedUser().uid).toPromise();
  }
}
