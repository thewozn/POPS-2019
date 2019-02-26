import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { ConnectedService } from '../services/connected.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  connecteduser: User;

  constructor(private connectedService: ConnectedService) {
    this.connecteduser = this.connectedService.getConnectedUser();
  }

  ngOnInit() {
  }
}
