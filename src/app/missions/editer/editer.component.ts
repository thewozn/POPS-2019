import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatInputModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import {ConnectedService} from '../../services/connected.service';
import {MissionService} from '../../services/mission.service';
import { UserService } from './../../services/user.service';
import { ServiceService } from './../../services/service.service';

import { User } from './../../models/user.model';
import { Service } from './../../models/service.model';
import { Mission } from '../../models/mission.model';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.scss']
})
export class EditerComponent implements OnInit {
  private mission: Mission;
  displayedColumns = ['NOM', 'PRENOM', 'SERVICE', 'ACTION'];
  isReadOnly: boolean;
  collaborateurInput = '';

  user: User[];
  service: Service[] = [];

  dataSource: MatTableDataSource<User>;
  dataSource_selected: MatTableDataSource<User>;

  collaborateurList: string[] = [];
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  myControl = new FormControl();

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private connectedService: ConnectedService,
    private missionService: MissionService,
    private serviceService: ServiceService,
    private userService: UserService,
    private modal: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.loadData();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.dataSource = new MatTableDataSource<User>();
    this.dataSource_selected = new MatTableDataSource();
  }


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

  newFilteredEvents(): void {
    const eventsList = [];

    if (this.collaborateurInput !== '') {
      this.dataSource = new MatTableDataSource<User>();
      for (const u of this.user) {
        if ((this.collaborateurInput === '') || (this.collaborateurInput === u.lastName + ' ' + u.firstName + ' | ' +
          this.serviceService.getServiceById(this.service, u.sid).name)) {
          this.dataSource.data.push(u);
        }
      }
    }
  }

  findEmployee(filterName: string, filterService: string, filterFunction: string): void {
    let filters = filterName + '+' + filterService + '+' + filterFunction;
    filters = filters.trim().toLowerCase();
    this.dataSource.filter = filters;
  }

  // TODO:
  validate(title: string, missionStart: string, missionEnd: string, description: string): void {
    if (title.length < 32 && missionStart !== '') {

      status = 'Validée';
      for (const dS of this.dataSource_selected.data) {
        if (dS.sid !== this.connectedService.getConnectedUser().sid) {
          status = 'En cours';
        }
      }

      const newMission: Mission = new Mission(null,
        description, // description
        missionEnd, // end
        missionStart, // start
        status, // status
        title, // title
        this.connectedService.getConnectedUser().sid,  // sid
        null,  // users
        null, // usersSub
      );

      this.missionService.addMissionFromServer(newMission).then(
        (response) => {

          console.log(newMission.mid);
          for (const dS of this.dataSource_selected.data) {
            this.missionService.affectUserToMissionFromServer(response.mid, dS.uid);
          }
          this.loadData();
          this.modal.open(this.modalContent, { size: 'sm' });
        },
        (error) => {
          console.log(error);
        }
      );

    }

  }

  loadData() {
    Promise.all([this.userService.getUsersFromServer(),
    this.serviceService.getServicesFromServer()]).then(
      values => {
        this.user = values[0];
        this.dataSource.data = values[0];
        this.service = values[1];


        for (const u of this.user) {
          this.collaborateurList.push(u.lastName);
          this.options.push(u.lastName + ' ' + u.firstName + ' | ' + this.serviceService.getServiceById(this.service, u.sid).name);
        }

        this.isReadOnly = this.route.snapshot.params['isRead'];
        this.missionService.getMissionByMidFromServer(+this.route.snapshot.params['mid']).then(
          (response) => {
            this.mission = response;

            const newDate = new Date(this.mission.startDate);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    );
  }

  endCreate() {
    this.modal.dismissAll();
    this.router.navigate(['mission/suivi']);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}


