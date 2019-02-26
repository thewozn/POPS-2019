import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ConnectedService} from '../../services/connected.service';
import {MissionService} from '../../services/mission.service';

@Component({
  selector: 'app-creer',
  templateUrl: './creer.component.html',
  styleUrls: ['./creer.component.scss']
})
export class CreerComponent implements OnInit {
  displayedColumns = ['NOM', 'PRENOM', 'SERVICE', 'FONCTION', 'ACTION'];
  dataSource: MatTableDataSource<Employee>;
  dataSource_selected: MatTableDataSource<Employee>;
  services: any;
  functions: any;

  popEmployee(employee: Employee): void {
    let index = this.dataSource_selected.data.indexOf(employee, 0);
    if (index > -1) {
      this.dataSource_selected.data.splice(index, 1);
    }

    index = this.dataSource.data.indexOf(employee, 0);
    if (index < 0) {
      this.dataSource.data.push(employee);
    }

    this.dataSource.data = this.dataSource.data;
    this.dataSource_selected.data = this.dataSource_selected.data;
  }



  pushEmployee(employee: Employee): void {
    let index = this.dataSource_selected.data.indexOf(employee, 0);
    if (index < 0) {
      this.dataSource_selected.data.push(employee);
    }

    index = this.dataSource.data.indexOf(employee, 0);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
    }

    this.dataSource.data = this.dataSource.data;
    this.dataSource_selected.data = this.dataSource_selected.data;
  }


  findEmployee(filterName: string, filterService: string, filterFunction: string): void {
    let filters = filterName + '+' + filterService + '+' + filterFunction;
    filters = filters.trim().toLowerCase();
    this.dataSource.filter = filters;
  }


  validate(title: string, start: Date, end: Date, description: string): void {
    const new_mission = {
      title : title,
      start: start,
      end: end,
      description: description,
      collaborators: this.dataSource_selected
    };

    console.log(new_mission);

    if (title.length > 5 && title.length < 32 && start !== null) {
    /*
     * TODO: envoie la structure au back
     */
      this.router.navigate(['/missions/suivi']);
    }
  }

  constructor(private router: Router, private connectedService: ConnectedService, private missionService: MissionService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource_selected = new MatTableDataSource();

    this.functions = [];
    this.services = [];

    for (const data of ELEMENT_DATA) {
      this.functions.push(data.FONCTION);
      this.services.push(data.SERVICE);
    }
    console.log(this.functions);


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
  {NOM: 'RUIZ', PRENOM: 'Olivier', SERVICE: 'Support', FONCTION: 'Technicien'},
  {NOM: 'DUPONT', PRENOM: 'Aurélien', SERVICE: 'Financier', FONCTION: 'Comptable'},
  {NOM: 'HM', PRENOM: 'Mourad', SERVICE: 'DG', FONCTION: 'PDG'},
  {NOM: 'HUBERT', PRENOM: 'Johanna', SERVICE: 'Support', FONCTION: 'Technicien'},
];
