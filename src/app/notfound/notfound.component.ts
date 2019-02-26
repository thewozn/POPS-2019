import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit, OnDestroy {
  users: User[];
  userSubscription: Subscription;

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  // constructor(private userService: UserService) { }

  // ngOnInit() {
  //   this.userService.getAll().subscribe(data => {
  //     this.users = data;
  //   });
  // }

  // ngOnDestroy() {
  //   this.userSubscription.unsubscribe();
  // }
}
