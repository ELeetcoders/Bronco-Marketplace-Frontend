import { ChangeDetectorRef, Component } from '@angular/core';
import { Observer } from 'rxjs';
import { PRODUCTS } from 'src/app/mock-products';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any;
  categories: string[];
  fetching: boolean = false;

  // categoryTitles: string[];  //temp var to rename category until changed firebase collection name

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
    ) {
    // this.products = PRODUCTS;
    // console.log(PRODUCTS)
    // this.categories = Object.keys(this.products);
  }

  ngOnInit(): void { //run whens component loads
    this.getAllProducts();
    console.log('here')
  }

  handleSearchResults(results: any) {
    //this.fetching = true;
    console.log(results)
    this.products = results
    this.categories = Object.keys(this.products);
    console.log(this.categories)
    //this.cd.detectChanges();
    //this.fetching = false
  }

  getAllProducts(): void {
    
    // Send the HTTP POST request to the server
    const observer: Observer<any> = {
      next: response => {
        console.log(response)
        this.products = response
        this.categories = Object.keys(this.products);
        // for (let i = 0; i < this.categories.length; i++) {
        //   if (this.categories[i] == "BOOK") {
        //     this.categoryTitles.push("Textbooks")
        //   }
        //   else if (this.categories[i] == "TECH") {
        //     this.categoryTitles.push("Tech")
        //   }
        //   else if (this.categories[i] == "SERVICES") {
        //     this.categoryTitles.push("Services")
        //   }
        // }
        console.log(this.categories)
        console.log(this.products['TECH'])
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    };

    this.http.get('http://localhost:8080/product/get-all', {}).subscribe(observer);
  }
}
