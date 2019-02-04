import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  prenom: any;
  nom: any;
  mail: any;
  notified: any;
  notifications: any;
  service: any;
  account_type: any;

  constructor(private UsersService: UsersService) {

  }

  ngOnInit() {
    this.prenom = this.UsersService.prenom;
    this.nom = this.UsersService.nom;
    this.mail = this.UsersService.mail;
    this.service = this.UsersService.service;
    this.account_type = this.UsersService.account_type;
    this.mail = this.UsersService.mail;
    this.notified = this.UsersService.notified;
    this.notifications = this.UsersService.notifications;

    $('#sidenav a').on('click', function(e) {
      $(this).addClass('active').siblings('a').removeClass('active');
    });

    $(document).ready(function() {
      $("#annuaire_href").click(function() {
        $("#modular_content").children("div").css('display', 'none');
      });
      $("#service_href").click(function() {
        $("#modular_content").children("div").css('display', 'none');
      });
      $("#conges_href").click(function() {
        $("#modular_content").children("div").css('display', 'none');
        $("#conges_section").css('display', 'block');
      });
      $("#frais_href").click(function() {
        $("#modular_content").children("div").css('display', 'none');
      });
      $("#mission_href").click(function() {
        $("#modular_content").children("div").css('display', 'none');
      });
    });

    $('#snackbar').on('click', function(e) {
      $(this).fadeOut(400, "swing");
    });

    $('#showButton').on('click', function(e) {
      if($('#sidenav').is(":hidden")){
        $('#sidenav').fadeIn(200, "swing");
        $('#sidenav').show();
      }
      else{
        $('#sidenav').fadeOut(200, "swing");
      }
    });

    $('#sidenav #closeButton').on('click', function(e) {
      $('#sidenav').fadeOut(200, "swing");
    });
  }
}
