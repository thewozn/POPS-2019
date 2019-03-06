import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectedService } from '../services/connected.service';
import { ServiceService } from '../services/service.service';

import { Service } from '../models/service.model';
import { User } from '../models/user.model';
@Component({
  selector: 'app-congesr',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit {
  navLinks: any[] = [];
  activeLinkIndex = -1;


  private service: Service[];
  constructor(private connectedService: ConnectedService, private serviceService: ServiceService, private router: Router) {
  }

  ngOnInit() {
    this.serviceService.getServicesFromServer().then(
      (response) => {
        this.service = this.service;
        this.generateNavLinks();

        this.router.events.subscribe((res) => {
          this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
        });
      },
      (error) => {

      }
    );
  }

  generateNavLinks() {
    this.navLinks.push(
      {
        label: 'Historique',
        link: './historique',
        index: 0
      },
      {
        label: 'Demande',
        link: './demander',
        index: 1
      }
    );

    if (this.connectedService.getConnectedUser().status === 'HeadOfService' ||
      this.connectedService.getConnectedUserService().name === 'HumanResource' ||
      this.connectedService.getConnectedUserService().name === 'Management') {
      this.navLinks.push(
        {
          label: 'Validation',
          link: './accepter',
          index: 2
        },
      );
    }
  }
}
