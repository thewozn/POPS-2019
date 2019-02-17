import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
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
  user: any;
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

    $('#sidenav a').on('click', function(e) {
      $(this).addClass('active').siblings('a').removeClass('active');
    });

    $(document).ready(function() {
      $('#annuaire_href').click(function() {
        $('#modular_content').children('div').css('display', 'none');
      });
      $('#service_href').click(function() {
        $('#modular_content').children('div').css('display', 'none');
      });
      $('#conges_href').click(function() {
        $('#modular_content').children('div').css('display', 'none');
        $('#conges_section').css('display', 'block');
      });
      $('#frais_href').click(function() {
        $('#modular_content').children('div').css('display', 'none');
      });
      $('#mission_href').click(function() {
        $('#modular_content').children('div').css('display', 'none');
      });
    });

    $('#snackbar').on('click', function(e) {
      $(this).fadeOut(400, 'swing');
    });

    $('#showButton').on('click', function(e) {
      if ($('#sidenav').is(':hidden')) {
        $('#sidenav').fadeIn(200, 'swing');
        $('#sidenav').show();
      } else {
        $('#sidenav').fadeOut(200, 'swing');
      }
    });

    $('#sidenav #closeButton').on('click', function(e) {
      $('#sidenav').fadeOut(200, 'swing');
    });
  }

  onSignOut() {
    this.connectedService.signOut();
    this.router.navigate(['/connexion']);
  }

  ngOnDestroy() {
    this.connecteduserSubscription.unsubscribe();
  }
}
