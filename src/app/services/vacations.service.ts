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

  getVacationsById(data: Vacations[], id: number) {
    const v = data.find(
      (res) => {
        return res.vid === id;
      }
    );
    return v;
  }

  async getVacationsByIdFromServer(id: number) {
    return await this.httpclient.get<Vacations>(this.globalService.getbaseUrl() + '/getVacationByVid/' + id).toPromise();
  }

  async getVacationsListFromServer() {
   return await  this.httpclient.get<Vacations[]>(this.globalService.getbaseUrl() + '/getVacationListAll').toPromise();
  }

  async getVacationsByConUserUidFromServer() {
    return await this.httpclient.get<Vacations[]>(this.globalService.getbaseUrl() + '/getVacationList/' +
    this.connectedService.getConnectedUser().uid).toPromise();
  }
}
