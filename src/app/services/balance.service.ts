import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ConnectedService } from '../services/connected.service';
import { GlobalService } from '../services/global.service';

import { Balance } from '../models/balance.model';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  balanceSubject = new Subject<Balance[]>();
  private balance: Balance[] = [];
  private connecteduser: User;

  constructor(private connectedService: ConnectedService, private httpclient: HttpClient, private globalService: GlobalService) {
    this.connecteduser = this.connectedService.getConnectedUser();
  }

  emitVacationsSubject() {
    if (this.balance != null) {
      this.balanceSubject.next(this.balance.slice());
    }
  }

  getVacationsByUidFromServer() {
    this.httpclient.get<Balance[]>(this.globalService.getbaseUrl() + '/getBalanceListByUid/' + this.connecteduser.uid).subscribe(
      (response) => {
        this.balance = response;
        this.emitVacationsSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }
}
