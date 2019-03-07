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
        console.log(this.dataSource);
        for(const ndf of this.dataSource){
           console.log("LA note de frais est"+ndf.requestDate);
         }
      }
    );
  }
// On affiche les lignes de notes de frais a partir du did de la note de frais
  consultation(did: number) {
    this.router.navigate(['notesfrais/meslignes', { did: did }]);
    }

}
