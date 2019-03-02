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

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})

export class SuiviComponent implements OnInit {
  private user: User[];
  private mission: Mission[];
  private service: Service[];

  constructor(
    private connectedService: ConnectedService,
    private missionService: MissionService,
    private serviceService: ServiceService,
    private userService: UserService
  ) {

  }

  // To udpate with new functions
  displayedColumns: string[] = ['titreMission', 'dateDebut', 'status', 'serviceName', 'consulter'];
  toppings = new FormControl();

  collaborateurListService: string[] = [];


  statutControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);


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

    if (this.connectedService.getConnectedUser().status === 'HeadOfService') {
      Promise.all([this.missionService.getMissionsByConUserSidFromServer(),
        this.userService.getUsersByConUserSidFromServer()]).then(
        values => {
          this.mission = values[0];
          this.user = values[1];

            for (const u of this.user) {
              this.collaborateurListService.push(u.lastName);
            }
        }
      );
    } else {
      this.missionService.getMissionsByConUserUidFromServer().then(
        (response) => {
          this.mission = response;
        }
      );
    }
  }
}
