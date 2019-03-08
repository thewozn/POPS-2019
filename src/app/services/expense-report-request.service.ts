import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { ConnectedService } from '../services/connected.service';

import { ExpenseReportRequest } from '../models/expense-report-request.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportRequestService {

  constructor(private httpclient: HttpClient, private globalService: GlobalService, private connectedService: ConnectedService) { }

  async getExpenseReportByConUserUidFromServer() {
    return await this.httpclient.get<ExpenseReportRequest>(this.globalService.getbaseUrl() + '/getLatestExpenseReport/' +
       this.connectedService.getConnectedUser().uid).toPromise();
   }

   async getExpenseReportListByConUserUidFromServer() {
     return await this.httpclient.get<ExpenseReportRequest[]>(this.globalService.getbaseUrl() +
     '/getExpenseReportByUid/' + this.connectedService.getConnectedUser().uid).toPromise();
   }

   async getExpenseReportListByConDidFromServer(did: number) {
    return await this.httpclient.get<ExpenseReportRequest>(this.globalService.getbaseUrl() +
    '/getExpenseReportByDid/' + did).toPromise();
  }

  async getExpenseReportList() {
    return await this.httpclient.get<ExpenseReportRequest[]>(this.globalService.getbaseUrl() + '/getExpenseReportList').toPromise();
  }

  async updateExpenseReport(expenseReport: ExpenseReportRequest) {
    return await this.httpclient.patch<ExpenseReportRequest>(this.globalService.getbaseUrl() + '/updateExpenseReport', 
    JSON.stringify(expenseReport), this.globalService.gethttpOptions()).toPromise();
  }
}
