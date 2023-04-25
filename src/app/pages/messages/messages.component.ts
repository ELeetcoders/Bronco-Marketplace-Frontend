import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  searchControl = new FormControl('')

  user$ = this.UserService.currentUser$
  
  users$ = combineLatest([
    this.UserService.allUsers$, 
    this.user$, 
    this.searchControl.valueChanges.pipe(startWith(''))]).pipe(
      map(([users, user, searchString]) => {
        return users.filter((u) =>
          u.username?.toLowerCase().includes(searchString!.toLowerCase()) &&
          u.username !== user.username
          )
      })
    );
    
  constructor(public UserService: UserService) {

     this.user$.subscribe((value) => {
       console.log(value);
     });
  }

  ngOnInit(): void {}

  createChat(otherUser: any) {
    
  }

}
