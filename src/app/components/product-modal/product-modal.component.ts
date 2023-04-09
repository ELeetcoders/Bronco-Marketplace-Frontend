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
  }

  closeModal() {
    // make it so that it changes to the base URL using location object
    console.log(this.title)
    console.log('eeee')
    this.modalRef.close();
    this.location.back()
    //this.modalRef.close();
    //this.router.navigate(['/'])
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydown(event: KeyboardEvent) {
    this.closeModal();
  }
  
}