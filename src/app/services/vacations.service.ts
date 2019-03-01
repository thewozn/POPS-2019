import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ConnectedService } from '../services/connected.service';
import { GlobalService } from '../services/global.service';

import { Vacations } from '../models/vacations.model';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class VacationsService {
  vacationsSubject = new Subject<Vacations[]>();
  private vacations: Vacations[] = [];
  constructor(private connectedService: ConnectedService, private httpclient: HttpClient, private globalService: GlobalService) {
  }

  emitVacationsSubject() {
    if (this.vacations != null) {
      this.vacationsSubject.next(this.vacations.slice());
    }
  }

  getVacationsById(id: number) {
    const v = this.vacations.find(
      (res) => {
        return res.vid === id;
      }
    );
    return v;
  }

  getVacationsListFromServer() {
    this.httpclient.get<Vacations[]>(this.globalService.getbaseUrl() + '/getVacationListAll').subscribe(
      (response) => {
        this.vacations = response;
        this.emitVacationsSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );
  }


  getVacationsByConUserUidFromServer() {
    this.httpclient.get<Vacations[]>(this.globalService.getbaseUrl() + '/getVacationListByUID/' +
    this.connectedService.getConnectedUser().uid).subscribe(
      (response) => {
        this.vacations = response;
        this.emitVacationsSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );
  }
}
