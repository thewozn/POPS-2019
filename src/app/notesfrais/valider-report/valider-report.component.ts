import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { ParsingService } from '../../services/parsing.service';
import { ExpenseReportRequestService } from '../../services/expense-report-request.service';
import { UserService } from '../../services/user.service';
import { ServiceService } from '../../services/service.service';

import { User } from '../../models/user.model';
import { Service } from '../../models/service.model';
import { ExpenseReportRequest } from '../../models/expense-report-request.model';
@Component({
  selector: 'app-valider-report',
  templateUrl: './valider-report.component.html',
  styleUrls: ['./valider-report.component.scss']
})
export class ValiderReportComponent implements OnInit {
  colors = {
    'Brouillon': '#DBFCFF',
    'En cours de validation 1': '#FFDEBF',
    'En cours de validation 2': '#F6FCAB',
    'Validée': '#B8FFA6',
    'A actualisée 1': '#FFBBBB',
    'A actualisée 2': '#FFBBBB',
  };
  
  displayedColumns = ['COLLABORATEUR', 'SERVICE', 'MOIS', 'STATUT', 'ACTION'];
  expenseReportRequest: ExpenseReportRequest[];
  user: User[];
  service: Service[];

  @ViewChild('imageList')
  imageList: TemplateRef<any>;
  modal_element: any;

  @ViewChild('refuseModal')
  refuseModal: TemplateRef<any>;

  constructor(private userService: UserService,
    private serviceService: ServiceService,
    private parsingService: ParsingService,
    private modal: NgbModal,
    private expenseReportRequestService: ExpenseReportRequestService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getUsersFromServer().then(
      (users) => {
        this.user = users;

        this.serviceService.getServicesFromServer().then(
          (services) => {
            this.service = services;

            this.expenseReportRequestService.getExpenseReportList().then(
              (response) => {
                console.log(response);
                this.expenseReportRequest = this.parsingService.filterExpenseReport(response);
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  consultation(did: number) {
    this.router.navigate(['notesfrais/validation', { did: did }]);
  }
}

