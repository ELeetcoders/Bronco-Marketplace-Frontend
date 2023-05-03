import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from './services/UserService';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User;

  constructor(
    public userService: UserService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {}

  handleSignout() {
    const options = { withCredentials: true };
    const data = {}
    const observer: Observer<any> = {
      next: response => {
          this.userService.email = ''
          console.log(this.userService.signedIn)
          this.userService.signedIn = false
          console.log(this.userService.signedIn)
          //this.cdRef.detectChanges();
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    };
    this.http.post('http://api.broncomarketplace.com:8080/login/sign-out', data, options).subscribe(observer);
  }

  ngOnInit(): void {
    console.log("urmom")
    console.log("it be like that")
    const options = { withCredentials: true };
    const observer: Observer<any> = {
      next: response => {
        if (response.status != 401 ) {
          this.user = response
          this.userService.signedIn = true
          this.userService.email = this.user.email
          this.userService.profilePic = this.user.profilePic ?? this.userService.defaultProfilePic
        }
        else {
          this.userService.profilePic = this.userService.defaultProfilePic
        }
      },
      error: error => {
        console.error(error)
        this.userService.profilePic = this.userService.defaultProfilePic
      },
      complete: () => console.log('complete')
    };
    this.http.get('http://api.broncomarketplace.com:8080/login/verify', options).subscribe(observer);
  }
}
