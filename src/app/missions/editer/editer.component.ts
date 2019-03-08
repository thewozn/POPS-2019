import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatTableDataSource, MatInputModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, startWith } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ConnectedService } from '../../services/connected.service';
import { MissionService } from '../../services/mission.service';
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
  private _error = new Subject<string>();
  private errorMessage: string;
  private mission: Mission;
  displayedColumns = ['NOM', 'PRENOM', 'SERVICE', 'ACTION', 'VALID', 'REFUS'];
  displayedColumnsAdd = ['NOM', 'PRENOM', 'SERVICE', 'ACTION'];
  isReadOnly = this.route.snapshot.params['isRead'];
  collaborateurInput = '';

  user: User[] = [];
  service: Service[] = [];

  dataSource: MatTableDataSource<User>;
  dataSource_selected: MatTableDataSource<User>;

  collaborateurList: string[] = [];
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  colors = {};
  myControl = new FormControl();
  minDate;
  minDateEnd;

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  @ViewChild('modalSuppression')
  modalSuppression: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private connectedService: ConnectedService,
    private missionService: MissionService,
    private serviceService: ServiceService,
    private userService: UserService,
    private modal: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User>();
    this.dataSource_selected = new MatTableDataSource();

    this.loadData();
    this._error.subscribe(message => (this.errorMessage = message));

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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
    this.dataSource = new MatTableDataSource<User>();

    if (this.collaborateurInput !== '') {
      for (const u of this.user) {
        if (!this.dataSource_selected.data.some(item => item.uid === u.uid)) {
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
      }
    } else {
      for (const u of this.user) {
        if (!this.dataSource_selected.data.some(item => item.uid === u.uid)) {
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

   validate(launch: boolean) {
    let checkLaunch = true;
    if (this.mission.title.length > 3) {
      if (this.mission.startDate !== '') {
        if (this.dataSource_selected.data.length > 0) {
          console.log(launch);
          if (launch) {
            console.log('DEBUG');
            if (this.mission.status === 'En cours') {
              this.mission.status = 'Terminée';
            } else if (this.mission.status === 'En création') {
              for (const dS of this.dataSource_selected.data) {
                const valid = this.mission.users.some(item => item.uid === dS.uid);
                const wait = this.mission.usersRequested.some(item => item.uid === dS.uid);
                const refused = this.mission.usersRefused.some(item => item.uid === dS.uid);

                if (dS.sid !== this.connectedService.getConnectedUser().sid && !valid && !wait && !refused) {
                  checkLaunch = false;
                }
              }

              if (this.mission.usersRequested.length > 0) {
                for (const u of this.mission.usersRequested) {
                  if (this.dataSource_selected.data.some(item => item.uid === u.uid)) {
                    checkLaunch = false;
                  }
                }
              }

              if (checkLaunch) {
                this.mission.status = 'En cours';
              }
            }
          }


          if (checkLaunch) {
           this.missionService.updateMissionFromServer(this.mission).then(
            response => {
              for (const dS of this.dataSource_selected.data) {
                const valid = this.mission.users.some(item => item.uid === dS.uid);
                const wait = this.mission.usersRequested.some(item => item.uid === dS.uid);
                const refused = this.mission.usersRefused.some(item => item.uid === dS.uid);

                if (!valid && !wait && !refused) {
                  console.log(dS);
                   this.missionService.affectUserToMissionFromServer(this.mission.mid, dS.uid).then(
                    (affect) => {
                      console.log(this.mission);
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                }
              }

              for (const u of this.dataSource.data) {
                const valid = this.mission.users.some(item => item.uid === u.uid);
                const wait = this.mission.usersRequested.some(item => item.uid === u.uid);

                if (valid === true || wait === true) {
                  console.log(u);
                   this.missionService.removeUserFromMissionFromServer(this.mission.mid, u.uid).then(
                    (remove) => {
                      console.log(this.mission);
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                }
              }

              this.modal.open(this.modalContent, { size: 'sm' });
            },
            error => {
              console.log(error);
            }
          );
          } else {
            this._error.next('Impossible de démarrer la mission.' +
            'En attente de la confirmation de la participation de certains des collaborateurs');
          }
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

  async loadData() {
    await Promise.all([
      this.userService.getUsersFromServer(),
      this.serviceService.getServicesFromServer()
    ]).then(values => {
      this.user = values[0];
      this.service = values[1];

      this.missionService
        .getMissionByMidFromServer(+this.route.snapshot.params['mid'])
        .then(
          response => {
            this.mission = response;

            const today = new Date();
            today.setDate(today.getDate());
            this.minDate = today.toISOString().substr(0, 10);
            this.minDateEnd = this.mission.startDate.substr(0, 10);

            for (const u of this.user) {
              const valid = this.mission.users.some(item => item.uid === u.uid);
              const wait = this.mission.usersRequested.some(
                item => item.uid === u.uid
              );
              const refused = this.mission.usersRefused.some(
                item => item.uid === u.uid
              );
              if (valid || wait || refused) {
                this.dataSource_selected.data.push(u);

                if (valid) {
                  this.colors[u.uid] = '#B8FFA6';
                }

                if (wait) {
                  this.colors[u.uid] = '#F6FCAB';
                }

                if (refused) {
                  this.colors[u.uid] = '#FFBBBB';
                }
              } else {
                if (u.sid === this.connectedService.getConnectedUser().sid) {
                  this.colors[u.uid] = '#B8FFA6';
                } else {
                  this.colors[u.uid] = '#F6FCAB';
                }
                this.dataSource.data.push(u);
                this.collaborateurList.push(u.lastName);
                this.options.push(
                  u.lastName +
                    ' ' +
                    u.firstName +
                    ' | ' +
                    this.serviceService.getServiceById(this.service, u.sid).name
                );
              }
            }
          },
          error => {
            console.log(error);
          }
        );
    });
  }

  endCreate() {
    this.modal.dismissAll();
    this.router.navigate(['mission/suivi']);
  }

  removeModal() {
    this.modal.open(this.modalSuppression, { size: 'sm' });
  }

  removeMission() {
    if (this.mission.status === 'En création') {
      this.missionService.removeMissionFromServer(this.mission.mid).then(
        response => {
          this.modal.dismissAll();
          this.router.navigate(['mission/suivi']);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.mission.status = 'Annulée';

      this.missionService.updateMissionFromServer(this.mission).then(
        response => {
          this.modal.dismissAll();
          this.router.navigate(['mission/suivi']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  updateEndDate() {
    this.minDateEnd = this.mission.startDate;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  validateUser(uid: number) {
    this.missionService
      .acceptUserRequestedForMissionFromServer(this.mission.mid, uid)
      .then(
        response => {
          this.loadData();
        },
        error => {
          console.log(error);
        }
      );
  }

  refuseUser(uid: number) {
    this.missionService
      .refuseUserRequestedForMissionFromServer(this.mission.mid, uid)
      .then(
        response => {
          this.loadData();
        },
        error => {
          console.log(error);
        }
      );
  }
}
