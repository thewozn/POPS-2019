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
  constructor(
    private connectedService: ConnectedService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSignIn(form: NgForm) {
    this.connectedService
      .signIn(form.value['user_email'], form.value['user_pwd'])
      .then(() => {
        console.log('Sign in successful!');
        this.router.navigate(['conges/historique']);
      });
  }
}
