import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import {ConnectedService} from '../services/connected.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-congesr',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit {
  navLinks: any[] = [];
  activeLinkIndex = -1;

  connecteduser: User;
  constructor(private connectedService: ConnectedService, private router: Router) {
    this.connecteduser = this.connectedService.getConnectedUser();
  }

  ngOnInit() {
    this.generateNavLinks();

    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  generateNavLinks() {
    this.navLinks.push(
      {
        label: 'Historique',
        link: './historique',
        index: 0
      },
      {
        label: 'Demander',
        link: './demander',
        index: 1
      }
    );

    if (this.connecteduser.status === 'HeadOfService') {
      this.navLinks.push(
        {
          label: 'Accepter',
          link: './accepter',
          index: 2
        },
      );
    }
  }
}
