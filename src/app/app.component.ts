import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConnectedService } from './services/connected.service';

import { User } from './models/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
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
  }
}
