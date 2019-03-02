import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


import { Service } from '../../models/service.model';
import { ServiceService } from '../../services/service.service';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-gestion-services',
  templateUrl: './gestion-services.component.html',
  styleUrls: ['./gestion-services.component.scss']
})
export class GestionServicesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'head', 'modif', 'supprimer'];
  service: Service[];
  user: User[];

  constructor(private serviceService: ServiceService, private userService: UserService, private modalService: NgbModal) { }

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

  addService(form: NgForm) {
    const newService: Service = new Service(null, form.value['name'], form.value['hos']);

    this.serviceService.addServiceServer(newService).then(
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

  openModif(content, element: Service) {
    this.modalService.open(content, { centered: true });
  }

  openSuppr(content) {
    this.modalService.open(content, { centered: true });
  }
}
