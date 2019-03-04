import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Employee} from '../../missions/creer/creer.component';
import {Router} from '@angular/router';
import {ConnectedService} from '../../services/connected.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ann-emploe',
  templateUrl: './ann-emploe.component.html',
  styleUrls: ['./ann-emploe.component.scss']
})
export class AnnEmploeComponent implements OnInit {
  displayedColumns = ['NOM', 'PRENOM', 'SERVICE', 'FONCTION', 'ACTION'];
  dataSource: MatTableDataSource<Employee>;
  services: any;
  functions: any;

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  modalData: {
    element: any;
  };

  handleEvent(element: any): void {
    this.modalData = { element };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  findEmployee(filterName: string, filterService: string, filterFunction: string): void {
    let filters = filterName + '+' + filterService + '+' + filterFunction;
    filters = filters.trim().toLowerCase();
    this.dataSource.filter = filters;
  }

  constructor(private modal: NgbModal, private router: Router, private connectedService: ConnectedService) { }


  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    this.functions = [];
    this.services = [];

    for (const data of ELEMENT_DATA) {
      if (!this.functions.includes(data.FONCTION)) {
        this.functions.push(data.FONCTION);
      }
      if (!this.services.includes(data.SERVICE)) {
        this.services.push(data.SERVICE);
      }
    }

    this.functions.sort();
    this.services.sort();


    this.dataSource.filterPredicate =
      (data: Employee, filters: string) => {
        const matchFilter = [];
        const filterArray = filters.split('+');
        const columns = (<any>Object).values(data);
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

export interface Employee {
  NOM: string;
  PRENOM: string;
  SERVICE: string;
  FONCTION: string;
}

/**
 * LISTE DE TOUS LES COLLABORATEURS
 */
const ELEMENT_DATA: Employee[] = [
  {NOM: 'DUPONT', PRENOM: 'Marc', SERVICE: 'Financier', FONCTION: 'Comptable'},
  {NOM: 'RUDEG', PRENOM: 'Willie', SERVICE: 'RH', FONCTION: 'Manager'},
  {NOM: 'CHAISE', PRENOM: 'Olivier', SERVICE: 'Support', FONCTION: 'Technicien'},
  {NOM: 'LAVERGNE', PRENOM: 'Julien', SERVICE: 'Support', FONCTION: 'Technicien'},
  {NOM: 'DUPONT', PRENOM: 'Aurélien', SERVICE: 'Financier', FONCTION: 'Comptable'},
  {NOM: 'HM', PRENOM: 'Mourad', SERVICE: 'DG', FONCTION: 'PDG'},
  {NOM: 'HUBERT', PRENOM: 'Johanna', SERVICE: 'Support', FONCTION: 'Technicien'},
  {NOM: 'RICK', PRENOM: 'Morty', SERVICE: 'Support', FONCTION: 'Technicien'},
  {NOM: 'TABLE', PRENOM: 'Paul', SERVICE: 'Financier', FONCTION: 'Comptable'},
  {NOM: 'BOUTEILLE', PRENOM: 'Jacob', SERVICE: 'Finance', FONCTION: 'Trésorier'},
  {NOM: 'NEL', PRENOM: 'Laurent', SERVICE: 'Support', FONCTION: 'Technicien'},
  {NOM: 'NAAZAMAPETILAN', PRENOM: 'Apu', SERVICE: 'Client', FONCTION: 'Accueil'},
];
