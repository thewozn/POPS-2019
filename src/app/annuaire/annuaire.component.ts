import { Component, OnInit } from '@angular/core';
import {ConnectedService} from '../services/connected.service';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.scss']
})
export class AnnuaireComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  account_type: any;
  service: any;

  constructor(private connectedService: ConnectedService, private router: Router) {
    this.navLinks = [
      {
        label: 'Annuaire Employé',
        link: './employe',
        index: 0
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
