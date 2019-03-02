import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Employee} from '../creer/creer.component';
import {Router} from '@angular/router';
import {ConnectedService} from '../../services/connected.service';
import {MissionService} from '../../services/mission.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.scss']
})
export class EditerComponent implements OnInit {

  displayedColumns = ['NOM', 'PRENOM', 'SERVICE', 'FONCTION', 'ACTION'];
  mission: any;
  isReadOnly: boolean;
  dataSource_selected = new MatTableDataSource();
  dataSource = new MatTableDataSource();
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
    this.mission = {
      title : this.mission.title,
      start: start,
      end: end,
      description: description,
      collaborators: this.dataSource_selected
    };

    if (title.length > 5 && title.length < 32 && start !== null) {
      /*
       * TODO: envoie la structure au back
       */
      this.router.navigate(['/missions/suivi']);
    }
  }

  constructor(private router: Router, private connectedService: ConnectedService, private missionService: MissionService ) { }


  ngOnInit() {

    // La mission doit être chargée via missionService !
    this.mission = {
      title: 'Mission visite Mali',
      start: '2019-02-22',
      end: '',
      description: 'Aucune description',
      collaborators: [
        {NOM: 'DUPONT', PRENOM: 'Marc', SERVICE: 'Financier', FONCTION: 'Comptable'},
        {NOM: 'RUDEG', PRENOM: 'Willie', SERVICE: 'RH', FONCTION: 'Manager'},
        {NOM: 'CHAISE', PRENOM: 'Olivier', SERVICE: 'Support', FONCTION: 'Technicien'}
      ]
    };

    const newDate = new Date(this.mission.start);

    if (newDate < new Date()) {
      console.log('readOnly');
      this.isReadOnly = true;
    } else {
      this.isReadOnly = false;
    }

    this.dataSource_selected = new MatTableDataSource(this.mission.collaborators);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  }

}

/**
 * LISTE DE TOUS LES COLLABORATEURS NON-AFFECTES A LA MISSION !
 */
const ELEMENT_DATA: Employee[] = [
  { NOM: 'DUPONT', PRENOM: 'Marc', SERVICE: 'Financier', FONCTION: 'Comptable' },
  { NOM: 'RUDEG', PRENOM: 'Willie', SERVICE: 'RH', FONCTION: 'Manager' },
  { NOM: 'RUIZ', PRENOM: 'Olivier', SERVICE: 'Support', FONCTION: 'Technicien' },
  { NOM: 'DUPONT', PRENOM: 'Aurélien', SERVICE: 'Financier', FONCTION: 'Comptable' },
  { NOM: 'HM', PRENOM: 'Mourad', SERVICE: 'DG', FONCTION: 'PDG' },
  { NOM: 'HUBERT', PRENOM: 'Johanna', SERVICE: 'Support', FONCTION: 'Technicien' },
];

