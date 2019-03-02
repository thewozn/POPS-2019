import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectedService } from '../services/connected.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private connectedService: ConnectedService, private router: Router) {

  }

  ngOnInit() {
    }


  onSignOut() {
    this.connectedService.signOut();
    this.router.navigate(['/connexion']);
  }

}
