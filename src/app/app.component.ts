import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from './services/UserService';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
    const options = { withCredentials: true };
    const observer: Observer<any> = {
      next: response => {
        if (response.status != 401 ) {
          this.userService.email = response
        }
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    };
    this.http.get('http://api.broncomarketplace.com:8080/login/verify', options).subscribe(observer);
  }
}
