import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GlobalService } from '../services/global.service';

import { ExpenseReportRequest } from '../models/expense-report-request.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportRequestService {


  errsSubject = new Subject<ExpenseReportRequest[]>();
  private errs: ExpenseReportRequest[] = [];

  constructor(private httpclient: HttpClient, private globalService: GlobalService) { }

  emitUsersSubject() {
    if (this.errs != null) {
      this.errsSubject.next(this.errs.slice());
    }
  }

}
