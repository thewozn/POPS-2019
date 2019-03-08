import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ConnectedService} from '../services/connected.service';

@Component({
  selector: 'app-notesfrais',
  templateUrl: './notesfrais.component.html',
  styleUrls: ['./notesfrais.component.scss']
})
export class NotesfraisComponent implements OnInit {

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
        label: 'Ma note de frais',
        link: './mynote',
        index: 0
      }, {
        label: 'Suivi',
        link: './suivi',
        index: 1
      },
    );

    if (this.connectedService.getConnectedUser().status === 'HeadOfService' || 
    this.connectedService.getConnectedUserService().name === 'Accounting' ||
      this.connectedService.getConnectedUserService().name === 'Management') {
      this.navLinks.push(
        {
          label: 'Valider',
          link: './valider',
          index: 2
        }
      );
    }
  }
}
