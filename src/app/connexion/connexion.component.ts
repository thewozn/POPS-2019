import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

import { ConnectedService } from '../services/connected.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  private _error = new Subject<string>();
  private errorMessage: string;
  constructor(
    private connectedService: ConnectedService,
    private router: Router
  ) { }

  ngOnInit() {
    this._error.subscribe((message) => this.errorMessage = message);
  }

  onSignIn(form: NgForm) {
    this.connectedService
      .signIn(form.value['user_email'], form.value['user_pwd'])
      .then((resolve) => {
        if (!this.connectedService.getConnectedUser().alive) {
          this._error.next('Compte inactif');
          this.connectedService.signOut();
        } else {
          if (this.connectedService.getConnectedUser().sid === null || this.connectedService.getConnectedUser().sid === undefined) {
            this._error.next('Aucun service affecté à ce compte');
            this.connectedService.signOut();
          } else {
            if (this.connectedService.getConnectedUser().lastName === 'Admin') {
              this.router.navigate(['administration/gestionusers']);
            } else {
              this.router.navigate(['mission/suivi']);
            }
          }
        }

      },
        (reject) => {
          this._error.next('Email ou Mot de passe incorrect');
        },
      );
  }
}
