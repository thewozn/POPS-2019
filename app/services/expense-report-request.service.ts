import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ExpenseReportRequest } from '../models/expense-report-request.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportRequestService {

  private baseUrl = '//localhost:8080';
  errsSubject = new Subject<ExpenseReportRequest[]>();
  private errs: ExpenseReportRequest[] = [];

  constructor(private httpclient: HttpClient) { }

  emitUsersSubject() {
    if (this.errs != null) {
      this.errsSubject.next(this.errs.slice());
    }
  }

  // TODO : changez l'url "users" à ce qui correspond au ligne de note de frais
  // getAll(): Observable<ExpenseReportRequest[]> {
  //   return this.httpclient.get<ExpenseReportRequest[]>(this.baseUrl + '/users');
  // }
}
