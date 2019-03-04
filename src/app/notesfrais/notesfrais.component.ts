import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notesfrais',
  templateUrl: './notesfrais.component.html',
  styleUrls: ['./notesfrais.component.scss']
})
export class NotesfraisComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Ma note de frais',
        link: './mynote',
        index: 0
      }, {
        label: 'Suivi',
        link: './suivi',
        index: 1
      }, {
        label: 'Valider',
        link: './valider',
        index: 2
      }
    ]; }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
