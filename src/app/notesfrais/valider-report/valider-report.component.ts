import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-valider-report',
  templateUrl: './valider-report.component.html',
  styleUrls: ['./valider-report.component.scss']
})
export class ValiderReportComponent implements OnInit {

  displayedColumns = ['MISSION', 'COLLABORATEUR', 'STATUT', 'REMBOURSEMENT', 'TYPE', 'DATE', 'MONTANT', 'ACTION'];
  dataSource = new MatTableDataSource();
  missions_list = [];

  @ViewChild('imageList')
  imageList: TemplateRef<any>;
  modal_element: any;

  @ViewChild('refuseModal')
  refuseModal: TemplateRef<any>;

  constructor(private missionService: MissionService, private modal: NgbModal, private snackBar: MatSnackBar) { }

  findEmployees(filterName: string, filterMission: string, filterMonth: string, filterYear: string, filterStatut: string): void {
    let filters = filterName + '+' + filterMission + '+' + filterMonth + '+' + filterYear + '+' + filterStatut;
    filters = filters.trim().toLowerCase();
    this.dataSource.filter = filters;
  }


  showGalleryEvent(element: Line): void {
    this.modal_element = element;
    this.modal.open(this.imageList, { size: 'lg' });
  }

  showRefuseEvent(element: Line): void {
    this.modal_element = element;
    this.modal.open(this.refuseModal, { size: 'lg' });
  }

  validate(element: Line): void {
    // TODO: Envoie au back la ligne validée.

    if (element.STATUT !== 'En attente') {
      this.openSnackBar('Vous ne pouvez pas modifier une ligne déjà traitée !', '❌');
    } else {
      const index = this.dataSource.data.indexOf(element, 0);
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
        element.STATUT = 'Validé';
        this.dataSource.data.push(element);
      }
      this.dataSource.data = this.dataSource.data;
      this.openSnackBar('La ligne a bien été acceptée', '✔');
    }
  }

  refuse(element: Line, motif: string): void {
    // TODO: Envoie au back la ligne validée.

    if (element.STATUT !== 'En attente') {
      this.openSnackBar('Vous ne pouvez pas modifier une ligne déjà traitée !', '❌');
    } else {
      const index = this.dataSource.data.indexOf(element, 0);
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
        element.STATUT = 'Refusé | ' + motif;
        this.dataSource.data.push(element);
      }
      this.dataSource.data = this.dataSource.data;
      this.openSnackBar('La ligne a bien été refusée', '✔');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    // Chargement des missions de l'employé
    for (const self_mission of this.missionService.user_missions) {
      this.missions_list.push(self_mission.name);
    }

    this.dataSource.filterPredicate =
      (data: Line, filters: string) => {
        const matchFilter = [];
        const filterArray = filters.split('+');
        const columns = [data.MISSION, data.COLLABORATEUR, data.STATUT,
          data.DATE.getFullYear().toString(), (data.DATE.getMonth() + 1).toString()];
        // OR be more specific [data.name, data.race, data.color];

        // Main
        filterArray.forEach(filter => {
          const customFilter = [];
          columns.forEach(column => customFilter.push(column.toLowerCase().includes(filter)));
          matchFilter.push(customFilter.some(Boolean)); // OR
        });
        return matchFilter.every(Boolean); // AND
      };
  }

}


export interface Files {
  PATH: string;
  TYPE: string;
}

export interface Line {
  MISSION: string;
  COLLABORATEUR: string;
  STATUT: string;
  REMBOURSEMENT: string;
  TYPE: string;
  DATE: Date;
  DETAILS: string;
  MONTANT: number;
  AVANCE: boolean;
  FILE: Files[];
}

const ELEMENT_DATA: Line[] = [
  {MISSION: 'Machine Learning', COLLABORATEUR: 'Greg FELDSPATH',
    STATUT: 'En attente', REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Transport', DATE: new Date('2019-03-15'),
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
  {MISSION: 'Machine Learning', COLLABORATEUR: 'Greg FELDSPATH', STATUT: 'En attente',
    REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Transport', DATE: new Date('2019-03-16'),
    DETAILS: 'Taxi aéroport-Hotel', MONTANT: 50, AVANCE: false, FILE: []},
  {MISSION: 'Machine Learning', COLLABORATEUR: 'Greg FELDSPATH', STATUT: 'En attente',
    REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Restaurant', DATE: new Date('2019-03-16'),
    DETAILS: 'Diner d\'affaire avec investisseurs', MONTANT: 70, AVANCE: false, FILE: []},
  {MISSION: 'Machine Learning', COLLABORATEUR: 'Greg FELDSPATH', STATUT: 'Refusé',
    REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Hôtel', DATE: new Date('2019-03-19'),
    DETAILS: 'Hotel Roger Smith 3 jours', MONTANT: 520, AVANCE: false, FILE: []},
  {MISSION: 'Machine Learning', COLLABORATEUR: 'Julien ORANGE', STATUT: 'En attente',
    REMBOURSEMENT: 'Conférence NY Tech', TYPE: 'Transport', DATE: new Date('2019-03-19'),
    DETAILS: 'Taxi Hotel-aéroport', MONTANT: 53, AVANCE: false, FILE: []},
  {MISSION: 'Machine Learning', COLLABORATEUR: 'Thomas POIRE', STATUT: 'En attente',
    REMBOURSEMENT: 'Intervention chez client', TYPE: 'Transport', DATE: new Date('2019-03-25'),
    DETAILS: 'Essence trajet aller-retour Paris-Tours', MONTANT: 130, AVANCE: false, FILE: []},
];
