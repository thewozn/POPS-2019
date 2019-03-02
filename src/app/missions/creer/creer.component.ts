import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import {ConnectedService} from '../../services/connected.service';
import { MissionService } from '../../services/mission.service';
import { UserService } from './../../services/user.service';
import { ServiceService } from './../../services/service.service';

import { User } from './../../models/user.model';
import {Service} from './../../models/service.model';







@Component({
  selector: 'app-creer',
  templateUrl: './creer.component.html',
  styleUrls: ['./creer.component.scss']

})
export class CreerComponent implements OnInit {
  displayedColumns = ['NOM', 'PRENOM', 'SERVICE', 'ACTION'];
  // dataSource: MatTableDataSource<Employee>;
  dataSource: MatTableDataSource<User>;
  user: User[];
  service: Service[] = [];

  // Tous les collaborateurs de tous les services
  collaborateurList: string[] = [];
  // dataSource_selected: MatTableDataSource<Employee>;
  options: string[] = [];
  dataSource_selected: MatTableDataSource<User>;
  myControl = new FormControl();

  filteredOptions: Observable<string[]>;
  constructor(
    private serviceService: ServiceService,
    private userService: UserService,
    private router: Router,
    private connectedService: ConnectedService,
    private missionService: MissionService) { }

  popEmployee(user: User): void {
    let index = this.dataSource_selected.data.indexOf(user, 0);
    if (index > -1) {
      this.dataSource_selected.data.splice(index, 1);
    }

    index = this.dataSource.data.indexOf(user, 0);
    if (index < 0) {
      this.dataSource.data.push(user);
    }

    this.dataSource.data = this.dataSource.data;
    this.dataSource_selected.data = this.dataSource_selected.data;
  }

  pushEmployee(user: User): void {
    let index = this.dataSource_selected.data.indexOf(user, 0);
    if (index < 0) {
      this.dataSource_selected.data.push(user);
    }

    index = this.dataSource.data.indexOf(user, 0);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
    }

    this.dataSource.data = this.dataSource.data;
    this.dataSource_selected.data = this.dataSource_selected.data;
  }

  findEmployee(filterName: string, filterService: string): void {
    let filters = filterName + '+' + filterService;
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

    if (title.length > 5 && title.length < 32 && start !== null) {
    /*
     * TODO: envoie la structure au back
     */
      this.router.navigate(['/missions/suivi']);
    }
  }

  ngOnInit() {
    this.loadData();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.dataSource = new MatTableDataSource<User>();
    this.dataSource_selected = new MatTableDataSource();

    this.dataSource.filterPredicate =
      (data: User, filters: string) => {
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

  loadData() {
    Promise.all([this.userService.getUsersFromServer(),
    this.serviceService.getServicesFromServer()]).then(
      values => {
        this.user = values[0];
        this.service = values[1];


        for (const u of this.user) {
          this.collaborateurList.push(u.lastName);
          this.options.push(u.lastName + ' ' + u.firstName + ' ' + this.serviceService.getServiceById(this.service, u.sid).name);
        }
      }
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}

export interface Employee {
  NOM: string;
  PRENOM: string;
  SERVICE: string;
  FONCTION: string;
}

