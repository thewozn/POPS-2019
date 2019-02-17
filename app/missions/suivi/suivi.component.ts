import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Mission } from './../../models/mission.model';


import {MatSelectModule} from '@angular/material/select'; 

const testMissions: Mission[] = [
{mid: 1, description: 'wesh', status: 'ok', title: 'test', sid:3},
{mid: 2, description: 'wesh', status: 'ok', title: 'test', sid:3},
{mid: 1, description: 'wesh', status: 'ok', title: 'test', sid:3},
{mid: 1, description: 'wesh', status: 'ok', title: 'test', sid:3}
];

export interface Statut {
  name: string;
}	

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})


export class SuiviComponent implements OnInit {
    displayedColumns: string[] = ['mid', 'description', 'status', 'title', 'sid'];
	missions = new MatTableDataSource(testMissions);
	toppings = new FormControl();
  toppingList: string[] = ['Jean Marie', 'Jose', 'Marc', 'Pierre', 'Andre', 'Sandra'];



	statutControl = new FormControl('', [Validators.required]);
    selectFormControl = new FormControl('', Validators.required);
    statuts: Statut[] = [
    {name: 'En Cours'},
    {name: 'Valide'},
    {name: 'Refus'}
  ];

  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
  	this.missions.sort = this.sort;
  }


}