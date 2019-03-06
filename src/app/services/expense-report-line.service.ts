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

}
