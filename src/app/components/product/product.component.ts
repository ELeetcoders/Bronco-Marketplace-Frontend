import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Product } from 'src/app/models/Product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  /* Input used for home page */
  @Input() product: Product | null = null;

  @Input() imageUrl: string = '';

  title: string = '';
  description: string = '';
  //imageUrl: string = '';

  // imageUrl: SafeUrl;

  constructor() {}

  ngAfterViewInit() {
    if (this.product != null) {
      this.title = this.product.name;
      this.description = this.product.desc;
      this.imageUrl = this.product.imageUrl;
    }
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
