import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

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
  private _error = new Subject<string>();
  private errorMessage: string;
  displayedColumns: string[] = ['name', 'head', 'modif', 'supprimer'];
  service: Service[];
  user: User[];
  modifServiceData;
  serviceName;
  constructor(private serviceService: ServiceService, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this._error.subscribe((message) => this.errorMessage = message);
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

    this.serviceService.addServiceFromServer(newService).then(
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
    this.modifServiceData = element;
    this.serviceName = element.name;
    this.modalService.open(content, { centered: true });
  }

  openSuppr(content) {
    this.modalService.open(content, { centered: true });
  }

  modifService() {
    if ((this.serviceName === 'Accounting' ||
      this.serviceName === 'HumanResource' ||
      this.serviceName === 'Management') && this.serviceName !== this.modifServiceData.name) {
      this._error.next('Interdiction de modifier le nom de ce service');
    } else {
      this.serviceService.updateServiceFromServer(this.modifServiceData).then(
        (response) => {
          this.loadData();
        },
        (error) => {
          console.log(error);
        }
      );

      this.modalService.dismissAll();
    }
  }
}
