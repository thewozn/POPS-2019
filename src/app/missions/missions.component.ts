import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectedService } from '../services/connected.service';
@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  navLinks: any[] = [];
  activeLinkIndex = -1;

  constructor(private router: Router, private connectedService: ConnectedService) {}

  ngOnInit() {
    this.generateNavLinks();
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  generateNavLinks() {
    this.navLinks.push(
      {
        label: 'Suivi',
        link: './suivi',
        index: 0
      },
    );

    if (this.connectedService.getConnectedUser().status === 'HeadOfService') {
      this.navLinks.push(
        {
          label: 'Creer',
          link: './creer',
          index: 1
        }
      );
    }
  }
}

