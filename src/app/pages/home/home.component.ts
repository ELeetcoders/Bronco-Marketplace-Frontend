import { ChangeDetectorRef, Component } from '@angular/core';
import { Observer } from 'rxjs';
import { PRODUCTS } from 'src/app/mock-products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from 'src/app/services/LoadingService';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any;
  categories: string[];
  query: string | null;
  isSearchEndpoint: boolean;

  // categoryTitles: string[];  //temp var to rename category until changed firebase collection name

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    public LoadingService: LoadingService,
    private route: ActivatedRoute,
    ) {
      this.isSearchEndpoint = this.route.snapshot.url[0]?.path === 'search';
    // this.products = PRODUCTS;
    // console.log(PRODUCTS)
    // this.categories = Object.keys(this.products);
  }

  ngOnInit(): void {
    console.log('here');
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.query = paramMap.get('query')|| '';
      if (this.isSearchEndpoint) {
        this.handleSearch(this.query);
      } else {
        this.getAllProducts();
      }
    });
  }

  handleSearch(searchTerm: string) {
    //let searchTerm = "example";
    if (searchTerm == undefined) {
      searchTerm = ''
    }
    this.LoadingService.loading = true
    
    console.log(searchTerm)
    const searchEndpoint = "http://ec2-54-213-144-191.us-west-2.compute.amazonaws.com:8080/product/search";
    const request = {
      term: searchTerm
    };
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        "request": searchTerm
      }
    };

    const observer: Observer<any> = {
      next: response => {
        console.log(response)
        this.products = response
        let updatedObject = {}
        for (const key in this.products) {
          if (key === "BOOK") {
            this.products["Textbooks"] = this.products[key];
            delete this.products["BOOK"]
          }
          else if (key === "TECH") {
            this.products["Tech"] = this.products[key];
            delete this.products["TECH"]
          }
          else if (key === "SERVICES") {
            this.products["Services"] = this.products[key];
            delete this.products["SERVICES"]
          }
        }
        this.categories = Object.keys(this.products);
        console.log(this.products)
        console.log(this.products['TECH'])
        this.LoadingService.loading = false;
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    };
    
    //post -> 3 params(endpoint, body, options)
    //get -> 2 params(endpoint, options)
    let result = this.http.get(searchEndpoint, httpOptions).subscribe(observer);
  
  }

  handleSearchResults(results: any) {
    //this.fetching = true;
    this.LoadingService.loading = false;
    console.log(results)
    this.products = results
    for (const key in this.products) {
      if (key === "BOOK") {
        this.products["Textbooks"] = this.products[key];
        delete this.products["BOOK"]
      }
      else if (key === "TECH") {
        this.products["Tech"] = this.products[key];
        delete this.products["TECH"]
      }
      else if (key === "SERVICES") {
        this.products["Services"] = this.products[key];
        delete this.products["SERVICES"]
      }
    }
    this.categories = Object.keys(this.products);
    console.log(this.categories)
    //this.cd.detectChanges();
    //this.fetching = false
  }

  getAllProducts(): void {
    this.LoadingService.loading = true;

    // Send the HTTP POST request to the server
    const observer: Observer<any> = {
      next: response => {
        console.log(response)
        this.products = response
        let updatedObject = {}
        for (const key in this.products) {
          if (key === "BOOK") {
            this.products["Textbooks"] = this.products[key];
            delete this.products["BOOK"]
          }
          else if (key === "TECH") {
            this.products["Tech"] = this.products[key];
            delete this.products["TECH"]
          }
          else if (key === "SERVICES") {
            this.products["Services"] = this.products[key];
            delete this.products["SERVICES"]
          }
        }
        this.categories = Object.keys(this.products);
        console.log(this.products)
        console.log(this.products['TECH'])
        this.LoadingService.loading = false;
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    };

    this.http.get('http://ec2-54-213-144-191.us-west-2.compute.amazonaws.com:8080/product/get-all', {}).subscribe(observer);
  }
}
