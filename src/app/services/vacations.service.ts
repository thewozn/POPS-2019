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
  vacationSubject = new Subject<Vacations[]>();
  private vacation: Vacations[] = [];
  private connecteduser: User;

  constructor(private connectedService: ConnectedService, private httpclient: HttpClient, private globalService: GlobalService) {
    this.connecteduser = this.connectedService.getConnectedUser();
  }

  emitVacationsSubject() {
    if (this.vacation != null) {
      this.vacationSubject.next(this.vacation.slice());
    }
  }

  getVacationsByUidFromServer() {
    this.httpclient.get<Vacations[]>(this.globalService.getbaseUrl() + '/getVacationListByUID/' + this.connecteduser.uid).subscribe(
      (response) => {
        this.vacation = response;
        this.emitVacationsSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }
}
