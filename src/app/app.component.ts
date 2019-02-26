import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConnectedService } from './services/connected.service';

import { User } from './models/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  notified: any;
  notifications: any;

  authStatus: boolean;
  connecteduser: User;
  connecteduserSubscription: Subscription;
  constructor(private connectedService: ConnectedService, private router: Router) {
  }

  ngOnInit() {
    this.connectedService.getIsAuth().subscribe(
      (value) => {
        this.authStatus = value;
      }
    );

    this.connecteduserSubscription = this.connectedService.connecteduserSubject.subscribe(
      (user: User) => {
        this.connecteduser = user;
      }
    );

    this.notified = this.connectedService.notified;
    this.notifications = this.connectedService.notifications;
  }

  onSignOut() {
    this.connectedService.signOut();
    this.router.navigate(['/connexion']);
  }

  ngOnDestroy() {
    this.connecteduserSubscription.unsubscribe();
  }
}
