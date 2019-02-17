import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ConnectedService } from '../services/connected.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  constructor(private connectedService: ConnectedService, private router: Router) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    console.log(form.value['user_email'] + ' ' + form.value['user_pwd']);
    this.connectedService.signIn(form.value['user_email'], form.value['user_pwd']);
    // TODO : changer la redirection
    this.router.navigate(['conges/demander']);
  }

}
