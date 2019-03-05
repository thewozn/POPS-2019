import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { ConnectedService } from './../../services/connected.service';
import { MissionService } from './../../services/mission.service';
import { ServiceService } from './../../services/service.service';
import { UserService } from './../../services/user.service';

import { Mission } from './../../models/mission.model';
import { User } from './../../models/user.model';
import { Service } from './../../models/service.model';

import { MatTableDataSource, MatInputModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})

export class SuiviComponent implements OnInit {
  private user: User[];
  private mission: Mission[];
  private displayedMission: Mission[];
  private service: Service[];


  constructor(
    private connectedService: ConnectedService,
    private missionService: MissionService,
    private serviceService: ServiceService,
    private userService: UserService,
    private router: Router
  ) {

  }

  // To udpate with new functions
  displayedColumns: string[] = ['titreMission', 'dateDebut', 'status', 'serviceName', 'consulter'];
  toppings = new FormControl();

  users_events = [];
  collaborateurListService: string[] = [];


  options: string[] = [];
  filteredOptions: Observable<string[]>;

  statutControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  myControl = new FormControl();
  colors = {};
  nameInput = '';
  statutInput = '';
  collaborateurInput = '';
  dateInput = '';



  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.serviceService.getServicesFromServer().then(
      (response) => {
        this.service = response;
      }
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    if (this.connectedService.getConnectedUser().status === 'HeadOfService') {
      Promise.all([this.missionService.getMissionsByConUserSidFromServer(),
      this.userService.getUsersByConUserSidFromServer()]).then(
        values => {
          this.mission = values[0];
          this.user = values[1];
          this.displayedMission = values[0];
          for (const u of this.user) {
            this.collaborateurListService.push(u.lastName);
          }

          for (const m of this.mission) {
            let found = false;
            for (const u of m.usersRequested) {
              if (u.sid === this.connectedService.getConnectedUser().sid) {
                found = true;
              }
            }

            if (found) {
              this.colors[m.mid] = '#F6FCAB';
            } else {
              this.colors[m.mid] = 'white';
            }
            this.options.push(m.title);
          }
        }
      );
    } else {
      this.missionService.getMissionsByConUserUidFromServer().then(
        (response) => {
          this.mission = response;
          this.displayedMission = response;
        }
      );
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);

  }

  consultation(id: number) {
    this.router.navigate(['mission/editer', { mid: id, isRead: this.connectedService.getConnectedUser().status !== 'HeadOfService'}]);
    }

  newFilteredEvents(): void {
    this.displayedMission = [];
    for (const m of this.mission) {
      const checkdate = m.startDate.substr(0, 4) + '-' + m.startDate.substr(5, 2) + '-' + m.startDate.substr(8, 2);
      if ((this.nameInput === '' || m.title === this.nameInput) && (this.statutInput === '' || m.status === this.statutInput)
        && (this.dateInput === '' || checkdate === this.dateInput)) {
        for (const u of m.users) {
          if ((this.collaborateurInput === '' || this.collaborateurInput === u.lastName)) {
            if (!(this.displayedMission.some((item) => (item.mid === m.mid)))) {
              this.displayedMission.push(m);
            }
          }
        }
      }
    }
  }
}
