import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  fetching: boolean = false;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
    ) {}

  onSignInClick() {
    const data = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
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
        if (response != "FAIL" ) {
          let user: User = response
          this.userService.email = this.email
          this.userService.profilePic = user.profilePic ?? this.userService.defaultProfilePic
          this.userService.signedIn = true
          this.router.navigate(['/'])
        }
      },
      error: error => {
        this.fetching = false
        console.error(error)
      },
      complete: () => console.log('complete')
    };

    const options = { withCredentials: true };

    this.http.post('http://api.broncomarketplace.com:8080/login/sign-up', data, options).subscribe(observer);
    this.fetching = true
  }
}
