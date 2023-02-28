import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent {
  title: string = 'Bronco Marketplace';

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private http: HttpClient
  ) { } //runs when component intialized

  ngOnInit(): void { //run whens component loads
  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent);
  }

  search() {
    let searchTerm = "example";
    const searchEndpoint = "SET OUR API ENDPOINT HERE";
    let result = this.http.get(searchEndpoint, {
      params: {
        "term": searchTerm
      }
    });

    result.subscribe((value) => {
      // Update UI from `value` (i believe its a string)
    })
  }
}
