import { Component, OnInit, ContentChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from './../../models/user.model';

import { Service } from './../../models/service.model';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.scss']
})
export class GestionUsersComponent implements OnInit {
  colors = {};
  displayedColumns: string[] = ['lastName', 'firstName', 'email', 'service', 'modif', 'supprimer'];
  user: User[];
  service: Service[];
  modifUserData;
  constructor(private userService: UserService, private serviceService: ServiceService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    Promise.all([this.userService.getUsersFromServer(),
    this.serviceService.getServicesFromServer()]).then(
      values => {
        this.user = values[0];
        this.service = values[1];

        for (const u of this.user) {
          if (u.alive) {
            this.colors[u.uid] = '#66ff66';
          } else {
            this.colors[u.uid] = '#808080';
          }
        }
      }
    );
  }

  addUser(form: NgForm) {
    const newUser: User = new User(null,
      null,
      form.value['sid'],
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

    this.userService.addUserServer(newUser).then(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.log(error);
      }
    );

    this.modalService.dismissAll();
  }

  modifUser() {
    this.userService.modifUserServer(this.modifUserData).then(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.log(error);
      }
    );

    this.modalService.dismissAll();
  }

  openCreer(content) {
     this.modalService.open(content, { centered: true });
  }

  openModif(content, element: any) {
    this.modifUserData = element;
    this.modalService.open(content, { centered: true });
  }

  desactivate() {
    this.modifUserData.alive = !this.modifUserData.alive;
    this.modifUser();
  }
}
