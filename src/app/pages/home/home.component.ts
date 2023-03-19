import { Component } from '@angular/core';
import { PRODUCTS } from 'src/app/mock-products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any;
  categories: string[];

  constructor() {
    this.products = PRODUCTS;
    this.categories = Object.keys(this.products);
  }
}
