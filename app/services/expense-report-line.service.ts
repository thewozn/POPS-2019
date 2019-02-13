import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ExpenseReportLine } from '../models/expense-report-line.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportLineService {

  private baseUrl = '//localhost:8080';
  erlsSubject = new Subject<ExpenseReportLine[]>();
  private erls: ExpenseReportLine[] = [];

  constructor(private httpclient: HttpClient) { }

  emitUsersSubject() {
    if (this.erls != null) {
      this.erlsSubject.next(this.erls.slice());
    }
  }

  // TODO : changez l'url "users" à ce qui correspond au ligne de note de frais
  // getAll(): Observable<ExpenseReportLine[]> {
  //   return this.httpclient.get<ExpenseReportLine[]>(this.baseUrl + '/users');
  // }
}
