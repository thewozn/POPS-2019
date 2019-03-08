import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { ExpenseReportRequest } from '../../models/expense-report-request.model';
import { ExpenseReportRequestService } from '../../services/expense-report-request.service';
@Component({
  selector: 'app-suivi-report',
  templateUrl: './suivi-report.component.html',
  styleUrls: ['./suivi-report.component.scss']
})
export class SuiviReportComponent implements OnInit {
  colors = {
    'Brouillon': '#DBFCFF',
    'En cours de validation 1': '#FFDEBF',
    'En cours de validation 2': '#F6FCAB',
    'Validée': '#B8FFA6',
    'A actualisée 1': '#FFBBBB',
    'A actualisée 2': '#FFBBBB',
  };
  
  dataSource: ExpenseReportRequest[] = []; // tableau des notes de frais
  displayedColumns = ['MOIS', 'STATUT', 'ACTION'];


  constructor(private erService: ExpenseReportRequestService, 
    private router: Router) { }

  ngOnInit() {
    this.loadData();

  }

  loadData() {
    this.erService.getExpenseReportListByConUserUidFromServer().then(
      (response) => {
        // this.erRequest = response;
        this.dataSource = response;
      }
    );
  }
// On affiche les lignes de notes de frais a partir du did de la note de frais
  consultation(did: number) {
    this.router.navigate(['notesfrais/meslignes', { did: did }]);
    }

}
