import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email: String | null= null;
  password: String | null= null;

  constructor(private http: HttpClient) {}

  testAuth() {
    const observer: Observer<any> = {
      next: response => {
        // Extract the cookie from the response
        //const cookie = response.headers.get('Set-Cookie');
        //if (cookie) {
          // Set the cookie using Document.cookie
          //document.cookie = cookie;
        //}
        console.log(response);
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    };
    const options = { withCredentials: true };
    this.http.get('http://api.broncomarketplace.com:8080/michael', options).subscribe(observer);
  }

  onSignInClick() {
    const data = {
      email: this.email,
      password: this.password
    };
  
    // Send the HTTP POST request to the server
    const observer: Observer<any> = {
      next: response => {
        // Extract the cookie from the response
        //const cookie = response.headers.get('Set-Cookie');
        //if (cookie) {
          // Set the cookie using Document.cookie
          //document.cookie = cookie;
        //}
        console.log(response);
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    };

    const options = { withCredentials: true };

    this.http.post('http://api.broncomarketplace.com:8080/login/sign-in', data, options).subscribe(observer);
  }
}
