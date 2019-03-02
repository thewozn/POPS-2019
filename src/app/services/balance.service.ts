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

  constructor(private connectedService: ConnectedService, private httpclient: HttpClient, private globalService: GlobalService) {
  }

  emitBalanceSubject() {
    if (this.balance != null) {
      this.balanceSubject.next(this.balance.slice());
    }
  }

  async getBalanceByUidFromServer() {
    return this.httpclient.get<Balance[]>(this.globalService.getbaseUrl() + '/getBalanceRestControllerListByUID/' +
    this.connectedService.getConnectedUser().uid).toPromise();
  }
}
