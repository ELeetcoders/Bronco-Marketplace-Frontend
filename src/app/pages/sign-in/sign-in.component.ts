import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email: string = '';
  password: string = '';
  fetching: boolean = false;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
   });
  }

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
    this.http.get('http://localhost:8080/michael', options).subscribe(observer);
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
        this.fetching = false
        if (response != "FAIL" ) {
          this.userService.email = this.email
          this.userService.signedIn = true
          this.router.navigate(['/'])
          this.openSnackBar("Successful sign in", "Close")
        }
        else {
          this.openSnackBar("Sign in failed", "here")
        }
      },
      error: error => {
        console.error(error)
        this.fetching = false
      },
      complete: () => console.log('complete')
    };

    const options = { withCredentials: true };

    this.http.post('http://api.broncomarketplace.com:8080/login/sign-in', data, options).subscribe(observer);
    this.fetching = true
  }
}
