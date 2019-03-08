import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { Subject } from 'rxjs';

import { ConnectedService } from '../../services/connected.service';
import { MissionService } from '../../services/mission.service';
import { ExpenseReportLineService } from '../../services/expense-report-line.service';
import { ExpenseReportRequestService } from '../../services/expense-report-request.service';


import { Mission } from './../../models/mission.model';
import { User } from './../../models/user.model';
import { ExpenseReportLine } from '../../models/expense-report-line.model';
import { ExpenseReportRequest } from '../../models/expense-report-request.model';

@Component({
  selector: 'app-mynote',
  templateUrl: './mynote.component.html',
  styleUrls: ['./mynote.component.scss']
})
export class MynoteComponent implements OnInit {
  colors = {
    'Brouillon': '#DBFCFF',
    'En cours de validation 1': '#FFDEBF',
    'En cours de validation 2': '#F6FCAB',
    'Validée': '#B8FFA6',
    'A actualisée 1': '#FFBBBB',
    'A actualisée 2': '#FFBBBB',
  };

  private _error = new Subject<string>();
  private errorMessage: string;
  date = new Date().toLocaleString('fr', { month: 'long' }).toUpperCase() + ' ' +  new Date().getFullYear();
  mission: Mission[] = [];
  displayedColumns = ['MISSION', 'REMBOURSEMENT', 'TYPE', 'DATE', 'DETAILS', 'MONTANT', 'ACTION'];
  fileColumns = ['FILE', 'ACTION'];
  missionMid: number;
  missionTitle: string;
  midElement: number;
  
  public files: UploadFile[] = [];

  dataSource: ExpenseReportLine[] = [];
  filesSource = new MatTableDataSource();
  filesSource_modal = new MatTableDataSource();

  erRequest: ExpenseReportRequest;


  @ViewChild('imageList')
  imageList: TemplateRef<any>;
  modal_element: any;

  @ViewChild('editLine')
  editLine: TemplateRef<any>;
  modal_line: any;
  line__files = [];


  constructor(private modal: NgbModal, private connectedService: ConnectedService,
              private missionService: MissionService, private erlService: ExpenseReportLineService,
              private erService: ExpenseReportRequestService,
              private snackBar: MatSnackBar) { }


  public dropped_modal(event: UploadEvent) {
    this.line__files = this.line__files.concat(event.files);
    for (const droppedFile of event.files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    this.filesSource_modal = new MatTableDataSource(this.line__files);
  }


  public dropped(event: UploadEvent) {
    this.files = this.files.concat(event.files);
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    this.filesSource = new MatTableDataSource(this.files);
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public pop(file: any) {
    const index = this.files.indexOf(file, 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    this.filesSource = new MatTableDataSource(this.files);
  }

  public popModal(file: any) {
    const index = this.line__files.indexOf(file, 0);
    if (index > -1) {
      this.line__files.splice(index, 1);
    }
    this.filesSource_modal = new MatTableDataSource(this.line__files);
  }

  public popLine(line: ExpenseReportLine) {
    this.erlService.deleteExpenseReportLineFromServer(line.lndfid).then(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // showGalleryEvent(element: Line): void {
  //   this.modal_element = element;
  //   this.modal.open(this.imageList, { size: 'lg' });
  // }

  editLineEvent(element: ExpenseReportLine): void {
    this.line__files = [];
    this.modal_line = element;
    this.modal.open(this.editLine, { size: 'lg' });
  }

  public pushLine(mission: string, remboursement: string, type: string, date: string, details: string, montant: string) {

    if (remboursement.length > 0 && type.length > 0) {
      const newExpenseReportLine: ExpenseReportLine = new ExpenseReportLine(
        null, // id ligne note de frais
        this.erRequest.did, //
        +this.missionMid, // id mission
        'null', // date de la demande
        false, // avance?
        +montant, // montant
        'En cours de validation 1', // statut
        'null',     // Raison du refus
        type, // Type de dépense
        remboursement, // motif de remboursement
        date, // date de l'event mission
        details // additionalDetails
      );


      this.erlService.addExpenseReportLineFromServer(newExpenseReportLine).then(
        response => {
          this.loadData();
        },
        error => {
          console.log(error);
        }
      );

      this.files = [];
      this.filesSource = new MatTableDataSource(this.files);

      this.openSnackBar('La ligne a bien été ajoutée', '✔');
    } else {
      this.openSnackBar('Veuillez vérifier les valeurs saisies', '❌');
    }
  }

  public modifyLine(element: ExpenseReportLine) {

    if (element.reasonOfRefund.length > 0 && element.typeOfExpense.length > 0) {
      const modifier_entry = this.dataSource.indexOf(element);

      this.erlService.updateExpenseReportLineFromServer(element).then(
        response => {
          this.loadData();
        },
        error => {
          console.log(error);
        }
      );

      this.line__files = [];
      this.filesSource = new MatTableDataSource(this.line__files);
      this.openSnackBar('La ligne a bien été modifiée', '✔');
    } else {
      this.openSnackBar('Veuillez vérifier les valeurs saisies', '❌');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this._error.subscribe((message) => this.errorMessage = message);
    this.loadData();
    this.filesSource = new MatTableDataSource(this.files);
    // this.dataSource = new MatTableDataSource();
  }

  loadData() {
    this.missionService.getMissionsByConUserUidFromServer().then(
      (response) => {
        for (const r of response) {
          if ((r.status === 'En cours' || r.status === 'Terminée' ) && !this.mission.some(item =>
            item.mid === r.mid)) {
            this.mission.push(r);
          }
        }
      }
    );

    this.erService.getExpenseReportByConUserUidFromServer().then(
      (response) => {
        this.erRequest = response;
        this.dataSource = this.erRequest.expenseReportLineRequest;
      }
    );
  }

  sendNote() {
    this.erRequest.status = 'En cours de validation 1';
    this.erService.updateExpenseReport(this.erRequest);
  }

  resend() {
    let sizeRefuse = 0;
    for (const line of this.erRequest.expenseReportLineRequest) {
      if (line.state === 'A actualisée 1' || line.state === 'A actualisée 2') {
        sizeRefuse = sizeRefuse + 1;
      }
    }

    if (sizeRefuse > 0) {
      this._error.next('Impossible de renvoyer la note de frais car certaines lignes sont toujours a actualiser');
    } else {
      if (this.erRequest.status === 'A actualisée 1') {
        this.erRequest.status = 'En cours de validation 1';
        this.erService.updateExpenseReport(this.erRequest).then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.erRequest.status = 'En cours de validation 2';
        this.erService.updateExpenseReport(this.erRequest).then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );;
      }
    }
  }
}
