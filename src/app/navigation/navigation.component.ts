import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectedService } from '../services/connected.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  notified: any;
  notifications: any;

  connecteduser: User;
  constructor(private connectedService: ConnectedService, private router: Router) {
    this.connecteduser = this.connectedService.getConnectedUser();
  }

  ngOnInit() {
    this.notified = this.connectedService.notified;
    this.notifications = this.connectedService.notifications;
  }

  onSignOut() {
    this.connectedService.signOut();
    this.router.navigate(['/connexion']);
  }

}
