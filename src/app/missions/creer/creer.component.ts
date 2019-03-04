import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {ConnectedService} from '../../services/connected.service';
import { MissionService } from '../../services/mission.service';
import { UserService } from './../../services/user.service';
import { ServiceService } from './../../services/service.service';

import { User } from './../../models/user.model';
import {Service} from './../../models/service.model';
import {Mission} from './../../models/mission.model';



@Component({
  selector: 'app-creer',
  templateUrl: './creer.component.html',
  styleUrls: ['./creer.component.scss']

})
export class CreerComponent implements OnInit {
  displayedColumns = ['NOM', 'PRENOM', 'SERVICE', 'ACTION'];

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  dataSource: MatTableDataSource<User>;
  dataSource_selected: MatTableDataSource<User>;

  collaborateurInput: string = "";
  
  user: User[];
  // private userDisplayed : User[];
  service: Service[] = [];

  // Tous les collaborateurs de tous les services
  collaborateurList: string[] = [];
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  private startDate = new Date();
  private endDate = null;

  myControl = new FormControl();

  constructor(
    private serviceService: ServiceService,
    private userService: UserService,
    private router: Router,
    private connectedService: ConnectedService,
    private missionService: MissionService, private modal: NgbModal) { }



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



  validate(title: string, missionStart: string, missionEnd: string, description: string): void {

 

    if (title.length > 5 && title.length < 32 && missionStart !== "" && missionEnd !== "") {
      // console.log(missionStart);
        const newMission: Mission = new Mission(null,
          description, //description 
          missionStart, //start
          missionEnd, //end
          "En cours", //status
          title, //title
          this.connectedService.getConnectedUser().sid,  //sid
          null,  //users
          null, //usersSub
          );

          this.missionService.addMissionFromServer(newMission).then(
            (response) => {

              console.log(newMission.mid);
              for(const dS of this.dataSource_selected.data){
                this.missionService.affectUserToMissionFromServer(response.mid, dS.uid);
              }
              this.loadData();
              this.modal.open(this.modalContent, {size: 'sm'});
            },
            (error) => {
              console.log(error);
            }
          )
    
    }
    
  }

  endCreate(){
    this.modal.dismissAll();
    this.router.navigate(['mission/suivi'])
  }

  ngOnInit() {
    this.loadData();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.dataSource = new MatTableDataSource<User>();
    this.dataSource_selected = new MatTableDataSource();



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
      }
    );
  }
  newFilteredEvents(
    ): void {
      const eventsList = [];

      if(this.collaborateurInput !== ""){
        this.dataSource = new MatTableDataSource<User>();
        for (const u of this.user){
          if((this.collaborateurInput ==="") || (this.collaborateurInput ===u.lastName + ' ' + u.firstName + ' | ' + 
          this.serviceService.getServiceById(this.service, u.sid).name)){
          this.dataSource.data.push(u);
          }
        }
      }
      
      
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

