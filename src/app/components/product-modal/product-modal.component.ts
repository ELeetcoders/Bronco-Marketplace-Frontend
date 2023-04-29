import { Component, HostListener } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProductDetailService } from 'src/app/services/ProductDetailService';

@Component({
  selector: 'app-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {

  imageUrl: string = '';
  title: string = '';
  description: string = '';
  price: string = '';
  email: string = '';

  constructor(
    public modalRef: MdbModalRef<ProductModalComponent>,
    private location: Location,
    public router: Router,
    public ProductDetailService: ProductDetailService
    ) {}

  ngOnInit() {
    this.imageUrl = this.ProductDetailService.imageUrl;
    this.description = this.ProductDetailService.description;
    this.title = this.ProductDetailService.title;
    this.price = this.ProductDetailService.price;
    this.email = this.ProductDetailService.email

  //   const modalState = {
  //     modal : true,
  //     desc : 'Product details'
  // };
  // history.pushState(modalState, '', '/idk');
  }

  @HostListener('window:popstate', ['$event'])
  closeModalOnBack() {
    this.modalRef.close()
  }

  closeModal() {
    this.modalRef.close()
    // make it so that it changes to the base URL using location object
    // console.log(this.title)
    // console.log('eeee')
    //this.modalRef.close();
    //this.location.back();
    //this.location.replaceState('/')
    //this.modalRef.close();
    //this.router.navigate(['/'])
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydown(event: KeyboardEvent) {
    this.closeModal();
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }
  
}