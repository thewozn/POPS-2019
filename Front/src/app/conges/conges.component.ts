import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit {

  account_type: any;
  service: any;

  constructor(private UsersService: UsersService) {

  }

  ngOnInit() {
    this.account_type = this.UsersService.account_type;
    this.service = this.UsersService.service;

    $('#top a').on('click', function(e) {
      $(this).addClass('active').siblings('a').removeClass('active');
    });
  }

}
