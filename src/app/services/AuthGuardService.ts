import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './UserService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(): boolean {
    if (this.userService.signedIn) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
