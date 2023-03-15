import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() title: string = 'David Dell';
  @Input() description: string = 'The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.';
}
