import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ConnectedService} from '../services/connected.service';
import { ServiceService } from '../services/service.service';

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
  constructor(private connectedService: ConnectedService, private serviceService: ServiceService, private router: Router) {
    this.serviceService.getServicesFromServer();
  }

  ngOnInit() {
    this.connecteduser = this.connectedService.getConnectedUser();

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

    if (this.connecteduser.status === 'HeadOfService' ||
      this.serviceService.getServiceById(this.connecteduser.sid).name === 'HumanResource' ||
      this.serviceService.getServiceById(this.connecteduser.sid).name === 'Management') {
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
