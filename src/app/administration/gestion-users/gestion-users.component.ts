import { Component, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['lastName', 'firstName', 'service', 'modif', 'supprimer'];
  user: User[];
  service: Service[];
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

  modifUser(form: NgForm) {
    const modUser: User = new User(null,
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

    this.userService.modifUserServer(modUser).then(
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
    const modalRef = this.modalService.open(content, { centered: true });
    console.log(element);
    modalRef.componentInstance.lastName = element.lastName;
  }

  openSuppr(content) {
    this.modalService.open(content, { centered: true });
  }
}
