import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExpenseReportRequestService} from '../../services/expense-report-request.service';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material';

import { ConnectedService } from '../../services/connected.service';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-mynote',
  templateUrl: './mynote.component.html',
  styleUrls: ['./mynote.component.scss']
})
export class MynoteComponent implements OnInit {

  date = new Date().toLocaleString('fr', { month: 'long' }).toUpperCase() + ' ' +  new Date().getFullYear();
  missions_list = [];
  displayedColumns = ['MISSION', 'REMBOURSEMENT', 'TYPE', 'DATE', 'DETAILS', 'MONTANT', 'ACTION'];
  fileColumns = ['FILE', 'ACTION'];
  public files: UploadFile[] = [];

  dataSource = new MatTableDataSource();
  filesSource = new MatTableDataSource();
  filesSource_modal = new MatTableDataSource();

  @ViewChild('imageList')
  imageList: TemplateRef<any>;
  modal_element: any;

  @ViewChild('editLine')
  editLine: TemplateRef<any>;
  modal_line: any;
  line__files = [];

  constructor(private modal: NgbModal, private connectedService: ConnectedService,
              private missionService: MissionService, private ers: ExpenseReportRequestService,
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

  public popLine(line: Line) {
    const index = this.dataSource.data.indexOf(line, 0);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
    }

    this.dataSource.data = this.dataSource.data;
  }

  showGalleryEvent(element: Line): void {
    this.modal_element = element;
    this.modal.open(this.imageList, { size: 'lg' });
  }

  editLineEvent(element: Line): void {
    this.line__files = [];
    this.modal_line = element;
    this.modal.open(this.editLine, { size: 'lg' });
  }

  public pushLine(mission: string, remboursement: string, type: string, date: string, details: string, montant: string) {
    // TODO: Envoyer au back la nouvelle ligne pour que les images soient enregistrée !

    if (remboursement.length > 0 && type.length > 0) {
      const newLine = {
        MISSION: mission, REMBOURSEMENT: remboursement, TYPE: type, DATE: new Date(date),
        DETAILS: details, MONTANT: parseFloat(montant), AVANCE: false, FILE: this.files
      };

      this.dataSource.data.push(newLine);

      this.files = [];
      this.filesSource = new MatTableDataSource(this.files);

      this.dataSource.data = this.dataSource.data;

      this.openSnackBar('La ligne a bien été ajoutée', '✔');
    } else {
      this.openSnackBar('Veuillez vérifier les valeurs saisies', '❌');
    }
  }

  public modifyLine(element: any, mission: string, remboursement: string, type: string, date: string, details: string, montant: string) {
    // TODO: Envoyer au back la nouvelle ligne pour que les images soient enregistrée sur le serveur !
    if (remboursement.length > 0 && type.length > 0) {
      const modifier_entry = this.dataSource.data.indexOf(element);
      this.dataSource.data[modifier_entry] = {
        MISSION: mission, REMBOURSEMENT: remboursement, TYPE: type, DATE: new Date(date),
        DETAILS: details, MONTANT: parseFloat(montant), AVANCE: false, FILE: this.line__files
      };

      this.line__files = [];
      this.filesSource = new MatTableDataSource(this.line__files);

      this.dataSource.data = this.dataSource.data;

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
    // Chargement des missions de l'employé
    for (const self_mission of this.missionService.user_missions) {
      this.missions_list.push(self_mission.name);
    }

    this.filesSource = new MatTableDataSource(this.files);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

}





export interface Files {
  PATH: string;
  TYPE: string;
}

export interface Line {
  MISSION: string;
  REMBOURSEMENT: string;
  TYPE: string;
  DATE: Date;
  DETAILS: string;
  MONTANT: number;
  AVANCE: boolean;
  FILE: Files[];
}

/**
 * LISTE DE TOUTES LES LIGNES ACTUELLES
 */
const ELEMENT_DATA: Line[] = [
  {MISSION: 'Machine Learning', REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Transport', DATE: new Date('2019-03-15'),
    DETAILS: 'billet d\'avion aller-retour vol Paris New-York', MONTANT: 1300, AVANCE: false, FILE: [
      {
        PATH: 'assets/test01.jpg',
        TYPE: '.jpg'
      },
      {
        PATH: 'assets/Test02.png',
        TYPE: '.png'
      }
    ]},
  {MISSION: 'Machine Learning', REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Transport', DATE: new Date('2019-03-16'),
    DETAILS: 'Taxi aéroport-Hotel', MONTANT: 50, AVANCE: false, FILE: []},
  {MISSION: 'Machine Learning', REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Restaurant', DATE: new Date('2019-03-16'),
    DETAILS: 'Diner d\'affaire avec investisseurs', MONTANT: 70, AVANCE: false, FILE: []},
  {MISSION: 'Machine Learning', REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Hôtel', DATE: new Date('2019-03-19'),
    DETAILS: 'Hotel Roger Smith 3 jours', MONTANT: 520, AVANCE: false, FILE: []},
  {MISSION: 'Machine Learning', REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Transport', DATE: new Date('2019-03-19'),
    DETAILS: 'Taxi Hotel-aéroport', MONTANT: 53, AVANCE: false, FILE: []},
  {MISSION: 'Machine Learning', REMBOURSEMENT: 'Intervention chez client', TYPE: 'Transport', DATE: new Date('2019-03-25'),
    DETAILS: 'Essence trajet aller-retour Paris-Tours', MONTANT: 130, AVANCE: false, FILE: []},
];
