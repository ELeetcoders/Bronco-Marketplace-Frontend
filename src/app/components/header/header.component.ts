import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent {
  title: string = 'Bronco Marketplace';
  products: any = ''
  searchTerm: string = '';
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) { } //runs when component intialized

  ngOnInit(): void { //run whens component loads
    this.getProducts();
  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent);
  }

  handleSearch(searchTerm: string) {
    //let searchTerm = "example";
    console.log(searchTerm)
    const searchEndpoint = "http://localhost:8080/product/search";
    const request = {
      term: searchTerm
    };
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    let result = this.http.post(searchEndpoint, request, httpOptions);
    console.log(result)
    result.subscribe((value) => {
      console.log(value)
      this.products = JSON.stringify(value)
    })
    this.cd.detectChanges();
    console.log(this.products + "testtt")
  }

  getProducts() {

    const getAllProductsEndpoint = "http://localhost:8080/product/get-all";
    let result = this.http.get(getAllProductsEndpoint, {});

    result.subscribe((value) => {
      console.log(value)
      this.products = JSON.stringify(value)
      console.log(value)
    })
  }
}
