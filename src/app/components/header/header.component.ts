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
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered'  //add this to make it centered
    })
  }

  onSearchKeyUp(event: any) {
    if (event.keyCode === 13) {
      this.handleSearch(this.searchTerm);
    }
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
      }),
      params: {
        "request": searchTerm
      }
    };
    
    //post -> 3 params(endpoint, body, options)
    //get -> 2 params(endpoint, options)

    let result = this.http.get(searchEndpoint, httpOptions);
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
    // result automatically parsed

    result.subscribe((value: any) => {   //need to make value type any
      console.log(value);
      // for (let i = 0; i < value.length; i++) {
      //   console.log(value[i].name);
      // }
      this.products = JSON.stringify(value)
    })
  }
}
