import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() title: string = 'David Dell';
  @Input() description: string = 'The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.';
  @Input() productImage: File;

  imageUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {}

  getImageUrl() {
    if (!this.productImage) {
      return '';
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(this.productImage);
  
    return this.imageUrl;
  }
}
