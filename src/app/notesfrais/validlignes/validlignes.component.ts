import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ExpenseReportLineService } from '../../services/expense-report-line.service';
import { ExpenseReportRequestService } from '../../services/expense-report-request.service';
import { UserService } from '../../services/user.service';
import { ServiceService } from '../../services/service.service';

import { ExpenseReportLine } from '../../models/expense-report-line.model';
import { ExpenseReportRequest } from '../../models/expense-report-request.model';
import { User } from '../../models/user.model';
import { Service } from '../../models/service.model';
@Component({
  selector: 'app-validlignes',
  templateUrl: './validlignes.component.html',
  styleUrls: ['./validlignes.component.scss']
})
export class ValidlignesComponent implements OnInit {
  colors = {
    'Brouillon': '#DBFCFF',
    'En cours de validation 1': '#FFDEBF',
    'En cours de validation 2': '#F6FCAB',
    'Validée': '#B8FFA6',
    'A actualisée 1': '#FFBBBB',
    'A actualisée 2': '#FFBBBB',
  };

  user: User[];
  service: Service[];
  erRequest: ExpenseReportRequest;
  erDate;
  dataSource: ExpenseReportLine[] = [];
  displayedColumns = ['MISSION', 'REMBOURSEMENT', 'TYPE', 'DATE', 'DETAILS', 'MONTANT', 'VALIDER', 'REFUSER'];

  constructor(private erlService: ExpenseReportLineService,
    private erService: ExpenseReportRequestService,
    private route: ActivatedRoute,
    private userService: UserService,
    private serviceService: ServiceService,
    private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.userService.getUsersFromServer().then(
      (users) => {
        this.user = users;
      },
      (error) => {
        console.log(error);
      },
    );

    this.serviceService.getServicesFromServer().then(
      (services) => {
        this.service = services;
      },
      (error) => {
        console.log(error);
      }
    );

    await this.erService.getExpenseReportListByConDidFromServer(+this.route.snapshot.params['did']).then(
      (response) => {
        this.erRequest = response;
        this.dataSource = this.erRequest.expenseReportLineRequest;
        console.log(this.dataSource);
      }
    );
  }

  validLine(id: number) {
    for (const line of this.dataSource) {
      if (line.lndfid === id) {
        if (line.state === 'En cours de validation 1') {
          line.state = 'En cours de validation 2';
        } else {
          line.state = 'Validée';
        }

        this.erlService.updateExpenseReportLineFromServer(line).then(
          (response) => {
            console.log(response);
            this.loadData();
            this.checkNoteStatus();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  refuseLine(id: number) {
    for (const line of this.dataSource) {
      if (line.lndfid === id) {
        if (line.state === 'En cours de validation 1') {
          line.state = 'A actualisée 1';
        } else {
          line.state = 'A actualisée 2';
        }

        this.erlService.updateExpenseReportLineFromServer(line).then(
          (response) => {
            console.log(response);
            this.loadData();
            this.checkNoteStatus();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  checkNoteStatus() {
    let size = 0;
    let sizeValidate = 0;
    let sizeRefuse1 = 0;
    let sizeRefuse2 = 0;
    for (const line of this.dataSource) {
      if (line.state === 'En cours de validation 2') {
        size = size + 1;
      }

      if (line.state === 'Validée') {
        sizeValidate = sizeValidate + 1;
      }

      if (line.state === 'A actualisée 1') {
        sizeRefuse1 = sizeRefuse1 + 1;
      }

      if (line.state === 'A actualisée 2') {
        sizeRefuse2 = sizeRefuse2 + 1;
      }
    }

    if (sizeRefuse1 > 0) {
      this.erRequest.status = 'A actualisée 1';

      this.erService.updateExpenseReport(this.erRequest).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (sizeRefuse2 > 0) {
      this.erRequest.status = 'A actualisée 2';

      this.erService.updateExpenseReport(this.erRequest).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      if (size === this.dataSource.length) {
        this.erRequest.status = 'En cours de validation 2';

        this.erService.updateExpenseReport(this.erRequest).then(
          (response) => {
            this.router.navigate(['notesfrais/valider']);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        if (sizeValidate === this.dataSource.length) {
          this.erRequest.status = 'Validée';
          this.erService.updateExpenseReport(this.erRequest).then(
            (response) => {
              this.router.navigate(['notesfrais/valider']);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    }
  }

  allValid() {
    for (const line of this.dataSource) {
      if (line.state === 'En cours de validation 1') {
        line.state = 'En cours de validation 2';
      } else {
        line.state = 'Validée';
      }

      this.erlService.updateExpenseReportLineFromServer(line).then(
        (response) => {
          console.log(response);
          this.loadData();
          this.checkNoteStatus();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  allRefuse() {
    for (const line of this.dataSource) {
      if (line.state === 'En cours de validation 1') {
        line.state = 'A actualisée 1';
      } else {
        line.state = 'A actualisée 2';
      }

      this.erlService.updateExpenseReportLineFromServer(line).then(
        (response) => {
          console.log(response);
          this.loadData();
          this.checkNoteStatus();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
