import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';

import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from 'src/app/services/LoadingService';
import { Router } from '@angular/router';

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
  modalRef: MdbModalRef<ProductModalComponent> | null = null;
  @Output() searchResults = new EventEmitter<any>();

  @ViewChild('profile') dropdown: MdbDropdownDirective;

  constructor(
    private modalService: MdbModalService,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    public LoadingService: LoadingService,
    private router: Router
  ) { } //runs when component intialized

  ngOnInit(): void { //run whens component loads
    //this.getProducts();
  }

  openModal() {
    this.modalRef = this.modalService.open(ProductModalComponent, {
      modalClass: 'modal-dialog-centered'  //add this to make it centered
    })
  }

  onSearchKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.router.navigate(['/search'], { queryParams: { query: this.searchTerm } });
    }
  }

  // handleSearch(searchTerm: string) {
  //   //let searchTerm = "example";
  //   this.LoadingService.loading = true
    
  //   console.log(searchTerm)
  //   const searchEndpoint = "http://api.broncomarketplace.com/product/search";
  //   const request = {
  //     term: searchTerm
  //   };
    
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     params: {
  //       "request": searchTerm
  //     }
  //   };
    
  //   //post -> 3 params(endpoint, body, options)
  //   //get -> 2 params(endpoint, options)

  //   let result = this.http.get(searchEndpoint, httpOptions);
  //   console.log(result)
  //   let slideContainers = document.querySelectorAll('swiper-slide');
  //   let categoryHeaders = document.querySelectorAll('.inventory-category');
  //   console.log(slideContainers)
  // for (let i = 0; i < slideContainers.length; i++) {
  //   console.log('removed')
  //   slideContainers[i].remove();
  // }
  // // for (let i = 0; i < categoryHeaders.length; i++) {
  // //   console.log('removed')
  // //   categoryHeaders[i].remove()
  // // }
  //   result.subscribe((value) => {
  //     console.log(value)
  //     //this.products = JSON.stringify(value)
  //     this.searchResults.emit(value)
  //     //this.cd.detectChanges();
  //   })
  //   //this.cd.detectChanges();
  //   console.log(this.products + "testtt")
  // }

  // getProducts() {

  //   const getAllProductsEndpoint = "http://api.broncomarketplace.com/product/get-all";
  //   let result = this.http.get(getAllProductsEndpoint, {});
  //   // result automatically parsed

  //   result.subscribe((value: any) => {   //need to make value type any
  //     console.log(value);
  //     // for (let i = 0; i < value.length; i++) {
  //     //   console.log(value[i].name);
  //     // }
  //     this.products = JSON.stringify(value)
  //   })
  // }
}
