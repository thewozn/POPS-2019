import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { Mission } from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  missionSubject = new Subject<Mission[]>();
  private mission: Mission[] = [];

  constructor(private httpclient: HttpClient, private globalService: GlobalService) { }

  emitMissionsSubject() {
    if (this.mission != null) {
      this.missionSubject.next(this.mission.slice());
    }
  }

  getMissionsFromServer() {
    this.httpclient.get<Mission[]>(this.globalService.getbaseUrl() + '/getMissionrList').subscribe(
      (response) => {
        this.mission = response;
        this.emitMissionsSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  addMissionServer(mission: Mission) {
    this.httpclient.post<Mission>(this.globalService.getbaseUrl() + '/createMission', JSON.stringify(mission),
    this.globalService.gethttpOptions()).subscribe(
      (response) => {
        console.log(response);
        this.getMissionsFromServer();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );
  }
}
