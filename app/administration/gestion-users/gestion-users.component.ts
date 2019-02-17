import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.scss']
})
export class GestionUsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['lastName', 'firstName', 'service', 'modif', 'supprimer'];
  user: User[];
  userSubscription: Subscription;

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.getUsersFromServer();
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.user = users;
      }
    );
  }

  addUser(form: NgForm) {
    const newUser: User = new User(null,
      'Collaborateur',
      null,
      form.value['lastName'],
      form.value['firstName'],
      new Date(),
      form.value['email'],
      form.value['address'],
      form.value['cp'],
      form.value['city'],
      form.value['country'],
      form.value['password'],
      'picturepath',
      true);

    this.userService.addUserServer(newUser);
    this.userService.getUsersFromServer();
    this.modalService.dismissAll();
  }

  modifUser(form: NgForm) {
    const modUser: User = new User(null,
      'Collaborateur',
      null,
      form.value['lastName'],
      form.value['firstName'],
      new Date(),
      form.value['email'],
      form.value['address'],
      form.value['cp'],
      form.value['city'],
      form.value['country'],
      form.value['password'],
      'picturepath',
      true);

      this.userService.modifUserServer(modUser);
      this.userService.getUsersFromServer();
      this.modalService.dismissAll();
  }

  openCreer(content) {
    this.modalService.open(content, { centered: true });
  }

  openModif(content, element: User) {
    this.modalService.open(content, { centered: true });
  }

  openSuppr(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
