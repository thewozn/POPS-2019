import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { MatTableDataSource, MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConnectedService } from '../../services/connected.service';
import { MissionService } from '../../services/mission.service';
import { UserService } from './../../services/user.service';
import { ServiceService } from './../../services/service.service';

import { User } from './../../models/user.model';
import { Service } from './../../models/service.model';
import { Mission } from './../../models/mission.model';

@Component({
  selector: 'app-creer',
  templateUrl: './creer.component.html',
  styleUrls: ['./creer.component.scss']
})
export class CreerComponent implements OnInit {
  private _error = new Subject<string>();
  private errorMessage: string;
  displayedColumns = ['NOM', 'PRENOM', 'SERVICE', 'ACTION'];

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  dataSource: MatTableDataSource<User>;
  dataSource_selected: MatTableDataSource<User>;

  collaborateurInput = '';

  user: User[];
  service: Service[] = [];
  collaborateurList: string[] = [];
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  colors = {};
  myControl = new FormControl();
  startDate;
  minDate;
  minDateEnd;

  modalData = {
    status: '',
    launch: false,
  };

  constructor(
    private serviceService: ServiceService,
    private userService: UserService,
    private router: Router,
    private connectedService: ConnectedService,
    private missionService: MissionService,
    private modal: NgbModal
  ) {}

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

  validate(title: string, missionStart: string, missionEnd: string, description: string, launch: boolean): void {
    if (title.length > 3) {
      if (missionStart !== '') {
        if (this.dataSource_selected.data.length > 0) {

          status = 'En création';

        if (launch === true) {
          console.log('DEBUG' + launch);
          status = 'En cours';
        }

        for (const dS of this.dataSource_selected.data) {
          if (dS.sid !== this.connectedService.getConnectedUser().sid) {
            status = 'En création';
          }
        }

        this.modalData = {status, launch};
        const newMission: Mission = new Mission(
          null,
          description, // description
          missionEnd, // end
          missionStart, // start
          status, // status
          title, // title
          this.connectedService.getConnectedUser().sid, // sid
          null, // users
          null,
          null // usersSub
        );

        this.missionService.addMissionFromServer(newMission).then(
          response => {
            for (const dS of this.dataSource_selected.data) {
              this.missionService.affectUserToMissionFromServer(
                response.mid,
                dS.uid
              );
            }
            this.loadData();
            this.modal.open(this.modalContent, { size: 'lg' });
          },
          error => {
            console.log(error);
          }
        );
        } else {
          this._error.next('Aucun collaborateur n\'est assigné à la mission');
        }
      } else {
        this._error.next('Veuillez saisir la date de début de la mission');
      }
    } else {
      this._error.next('Le titre de la mission doit être d\' au moins 3 caractères');
    }
  }

  endCreate() {
    this.modal.dismissAll();
    this.router.navigate(['mission/suivi']);
  }

  ngOnInit() {
    this.loadData();
    this._error.subscribe(message => (this.errorMessage = message));

    const today = new Date();
    today.setDate(today.getDate());
    this.minDate = today.toISOString().substr(0, 10);
    this.minDateEnd = today.toISOString().substr(0, 10);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.dataSource = new MatTableDataSource<User>();
    this.dataSource_selected = new MatTableDataSource();
  }

  loadData() {
    Promise.all([
      this.userService.getUsersFromServer(),
      this.serviceService.getServicesFromServer()
    ]).then(values => {
      this.user = values[0];
      this.dataSource.data = values[0];
      this.service = values[1];

      for (const u of this.user) {
        this.collaborateurList.push(u.lastName);
        this.options.push(
          u.lastName +
            ' ' +
            u.firstName +
            ' | ' +
            this.serviceService.getServiceById(this.service, u.sid).name
        );

        if (u.sid === this.connectedService.getConnectedUser().sid) {
          this.colors[u.uid] = '#B8FFA6';
        } else {
          this.colors[u.uid] = '#F6FCAB';
        }
      }
    });
  }

  newFilteredEvents(): void {
    this.dataSource = new MatTableDataSource<User>();

    if (this.collaborateurInput !== '') {
      for (const u of this.user) {
        if (
          this.collaborateurInput === '' ||
          this.collaborateurInput ===
            u.lastName +
              ' ' +
              u.firstName +
              ' | ' +
              this.serviceService.getServiceById(this.service, u.sid).name
        ) {
          this.dataSource.data.push(u);
        }
      }
    } else {
      for (const u of this.user) {
        this.dataSource.data.push(u);
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  updateEndDate() {
    this.minDateEnd = this.startDate;
  }
}

export interface Employee {
  NOM: string;
  PRENOM: string;
  SERVICE: string;
  FONCTION: string;
}
