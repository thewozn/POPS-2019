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

  authStatus: boolean;

  constructor(private connectedService: ConnectedService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.connectedService.isAuth;
  }

  onSignIn(form: NgForm) {
    console.log(form.value['user_email'] + ' ' + form.value['user_pwd']);
    // this.connectedService.signIn(user_name, user_pwd).then(
    //   () => {
    //     console.log('Sign in successful!');
    //     this.authStatus = this.connectedService.isAuth;
    //     this.router.navigate(['notfound']);
    //   }
    // );
    this.connectedService.signIn(form.value['user_email'], form.value['user_pwd']);
    this.authStatus = this.connectedService.isAuth;
    // TODO : changer la redirection
    this.router.navigate(['conges/demander']);
  }

  onSignOut() {
    this.connectedService.signOut();
    this.authStatus = this.connectedService.isAuth;
  }
}
