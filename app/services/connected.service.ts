import { Injectable } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
@Injectable()
export class ConnectedService {
  isAuth = false;
  connecteduser: any;

  prenom = 'Didier';
  nom = 'LEBLANC';
  mail = 'didier.leblanc@polytech.com';
  service = 'RH';
  account_type = 'Collaborateur'; // Can be Chef or Collaborateur
  notified = true;
  notifications = [
    'Congés validés (CDS)',
    'Affectation mission (E6835)',
    'Congés validés (RH)'
  ];

  constructor(private userService: UserService) {}

  signIn(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.isAuth = true;
      this.userService.getUserByEmail(email).subscribe(data => {
        this.connecteduser = data;
      });
    });
  }

  signOut() {
    this.isAuth = false;
  }
}
