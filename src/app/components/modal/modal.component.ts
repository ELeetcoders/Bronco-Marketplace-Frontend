import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private location: Location,
    public router: Router
    ) {}

  closeModal() {
    // make it so that it changes to the base URL using location object
    console.log('eeee')
    this.modalRef.close();
    this.location.back()
    //this.modalRef.close();
    //this.router.navigate(['/'])
  }

}