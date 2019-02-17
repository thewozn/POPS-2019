import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

import {ConnectedService} from '../services/connected.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-congesr',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit, OnDestroy {

  account_type: any;
  service: any;

  authStatus: boolean;
  connecteduser: User;
  connecteduserSubscription: Subscription;
  constructor(private connectedService: ConnectedService) {

  }

  ngOnInit() {
    this.connecteduserSubscription = this.connectedService.connecteduserSubject.subscribe(
      (user: User) => {
        this.connecteduser = user;
      }
    );

    this.account_type = this.connectedService.account_type;
    this.service = this.connectedService.service;

    $('#top a').on('click', function(e) {
      $(this).addClass('active').siblings('a').removeClass('active');
    });
  }

  ngOnDestroy() {
    this.connecteduserSubscription.unsubscribe();
  }
}
