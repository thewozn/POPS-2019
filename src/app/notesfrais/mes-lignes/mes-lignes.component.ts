import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExpenseReportLineService } from '../../services/expense-report-line.service';
import { ExpenseReportRequestService } from '../../services/expense-report-request.service';
import { ExpenseReportLine } from '../../models/expense-report-line.model';
import { ExpenseReportRequest } from '../../models/expense-report-request.model';


@Component({
  selector: 'app-mes-lignes',
  templateUrl: './mes-lignes.component.html',
  styleUrls: ['./mes-lignes.component.scss']
})
export class MesLignesComponent implements OnInit {
  colors = {
    'Brouillon': '#DBFCFF',
    'En cours de validation 1': '#FFDEBF',
    'En cours de validation 2': '#F6FCAB',
    'Validée': '#B8FFA6',
    'A actualisée 1': '#FFBBBB',
    'A actualisée 2': '#FFBBBB',
  };
  
  erRequest: ExpenseReportRequest;
  erDate;
  dataSource: ExpenseReportLine[] = []; 
  displayedColumns = ['MISSION', 'REMBOURSEMENT', 'TYPE', 'DATE', 'DETAILS', 'MONTANT', 'AVANCE'];


  constructor(private erlService: ExpenseReportLineService,
    private erService: ExpenseReportRequestService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
    this.erDate = new Date(this.erRequest.requestDate).
    toLocaleString('fr', { month: 'long' }).toUpperCase() + ' ' + new Date().getFullYear();
    console.log(this.erDate);
  }

  async loadData() {
    await this.erService.getExpenseReportListByConDidFromServer(+this.route.snapshot.params['did']).then(
      (response) => {
        this.erRequest = response;
        this.dataSource = this.erRequest.expenseReportLineRequest;
        console.log(this.dataSource);
      }
    );
  }
}
