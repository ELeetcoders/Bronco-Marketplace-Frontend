import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Product } from 'src/app/models/Product';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Location } from '@angular/common';
import { Router, UrlSegment } from '@angular/router';
import { ProductDetailService } from 'src/app/services/ProductDetailService';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  /* Input used for home page */
  @Input() product: Product | null = null;

  @Input() imageUrl: string = '';

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() price: string = '';

  id: string = ''; 
  //imageUrl: string = '';

  // imageUrl: SafeUrl;

  modalRef: MdbModalRef<ProductModalComponent> | null = null;
      isOpen: boolean = false

  constructor(
    private cd: ChangeDetectorRef,
    private modalService: MdbModalService,
    private location: Location,
    private router: Router,
    public ProductDetailService: ProductDetailService,
    ) {

      this.location.subscribe((loc) => {
        console.log(loc)
        if (loc.url === '') {
          if (this.modalRef) {
            this.modalRef?.close()
          }
          else {
          this.location.replaceState('/')
          }
          //this.location.go('/', '', this.router.parseUrl(this.router.url).queryParams);
          //this.location.back()
        }
        else if (loc.url === '/product/' + this.id) {
          // this.modalRef = this.modalService.open(ProductModalComponent, {
          //   modalClass: 'modal-fullscreen'
          // })
          //this.location.go('/product/' + this.id, '', this.router.parseUrl(this.router.url).queryParams);
          //this.location.forward()
        }
      });
    }

  ngAfterViewInit() {
    console.log('changes')
    if (this.product != null) {
      this.title = this.product.name;
      this.description = this.product.desc;
      this.price = "$" + this.product.price.toString()
      this.id = this.product.id;
      // if (!this.imageUrl.includes("data:image/jpeg;base64,")) {
      //   console.log(this.imageUrl)
      //   this.imageUrl = "data:image/jpeg;base64," + this.imageUrl
      //   console.log(this.imageUrl)
      // }
      // if (this.product.imageUrl == undefined) {
      //   this.imageUrl = this.product["imageURL"]
      // }
      this.imageUrl = this.product.imageUrl;
    }
    //this.cd.detectChanges();
  }

  openModal() {
    this.modalRef = this.modalService.open(ProductModalComponent, {
      modalClass: 'modal-fullscreen'
    })
    //this.location.replaceState('/product/' + this.id, '', this.router.parseUrl(this.router.url).queryParams);
    //this.location.go('/product/' + this.id)

    const currentPath = this.location.path();
    if (history.state !== null && currentPath.includes('/product/')) {
      this.location.replaceState(window.history.state, document.title, window.location.href);
    } else {
      this.location.go('/product/' + this.id);
    }

    this.ProductDetailService.imageUrl = this.imageUrl
    this.ProductDetailService.price = this.price
    this.ProductDetailService.description = this.description
    this.ProductDetailService.title = this.title
    //this.router.navigate(['/product/' + this.id])
  }

  // getImageUrl() {
  //   if (!this.productImage) {
  //     return '';
  //   }
  
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageUrl = reader.result as string;
  //   };
  //   reader.readAsDataURL(this.productImage);
  
  //   return this.imageUrl;
  // }
}
