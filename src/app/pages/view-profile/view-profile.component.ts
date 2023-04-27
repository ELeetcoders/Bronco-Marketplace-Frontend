import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observer } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { LoadingService } from 'src/app/services/LoadingService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {

  products: Product[];

  constructor(public userService: UserService, public loadingService: LoadingService, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('here');
    this.getUserProducts()
  }

  getUserProducts() {
    let searchTerm: string = this.userService.email.toString();
    
    
    console.log(searchTerm)
    const userProductsEndpoint = "http://api.broncomarketplace.com:8080/user/get-listings";

    const options = {
      withCredentials: true
    };
    const observer: Observer<any> = {
      next: response => {
          //this.cdRef.detectChanges();
          console.log("here")
          this.products = response
          this.loadingService.loading = false
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    };
    let result = this.http.get(userProductsEndpoint, options).subscribe(observer);
    this.loadingService.loading = true;
  }

}
