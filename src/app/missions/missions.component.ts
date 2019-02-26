import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
  this.navLinks = [
    {
      label: 'Suivi',
      link: './suivi',
      index: 0
    }, {
      label: 'Creer',
      link: './creer',
      index: 1
    }, {
      label: 'Editer',
      link: './editer',
      index: 2
    },
  ]; }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}

