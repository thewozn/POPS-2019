import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ConnectedService} from '../services/connected.service';

@Component({
  selector: 'app-congesr',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit {

  account_type: any;
  service: any;

  constructor(private connectedService: ConnectedService) {

  }

  ngOnInit() {
    this.account_type = this.connectedService.account_type;
    this.service = this.connectedService.service;

    $('#top a').on('click', function(e) {
      $(this).addClass('active').siblings('a').removeClass('active');
    });
  }

}
