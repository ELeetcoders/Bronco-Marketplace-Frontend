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

  @Input() title: string = '';
  @Input() description: string = '';
  //imageUrl: string = '';

  // imageUrl: SafeUrl;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    console.log('changes')
    if (this.product != null) {
      this.title = this.product.name;
      this.description = this.product.desc;
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
