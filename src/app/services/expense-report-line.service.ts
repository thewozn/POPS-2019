import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { ExpenseReportLine } from '../models/expense-report-line.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportLineService {

  constructor(private httpclient: HttpClient, private globalService: GlobalService) { }

  async addExpenseReportLineFromServer(line: ExpenseReportLine) {
    return await this.httpclient.post<ExpenseReportLine>(this.globalService.getbaseUrl() + '/addExpenseReportLineRequest', JSON.stringify(line),
      this.globalService.gethttpOptions()).toPromise();
  }
  
  async updateExpenseReportLineFromServer(line: ExpenseReportLine) {
    return await this.httpclient.patch<ExpenseReportLine>(this.globalService.getbaseUrl() + '/updateExpenseReportLineRequest', JSON.stringify(line),
      this.globalService.gethttpOptions()).toPromise();
  }

  async deleteExpenseReportLineFromServer(id: number) {
    return await this.httpclient.delete<ExpenseReportLine>(this.globalService.getbaseUrl() + '/deleteExpenseReportLineRequest/' + id, 
      this.globalService.gethttpOptions()).toPromise();
  }



}
