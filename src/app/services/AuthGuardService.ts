import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './UserService';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, catchError, map, of } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.userService.signedIn == true) {
      return true
    }
    const options = { withCredentials: true };
    return this.http.get('http/localhost:4200', options).pipe(
      map((response: any) => {
        if (response.status !== 401) {
          this.user = response;
          this.userService.signedIn = true;
          this.userService.email = this.user.email;
          this.userService.profilePic = this.user.profilePic ?? this.userService.defaultProfilePic;
          return true;
        } else {
          this.userService.profilePic = this.userService.defaultProfilePic 
          throw new Error('Unauthorized');
        }
      }),
      catchError((error: any) => {
        console.error(error);
        this.router.navigate(['/sign-in']);
        return of(false);
      })
    )
  }
}
