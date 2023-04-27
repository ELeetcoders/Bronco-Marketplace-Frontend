import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/UserService';
import { ChatsService } from 'src/app/services/chats.service';

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
        return users.filter((otherUser) =>
          otherUser.username?.toLowerCase().includes(searchString!.toLowerCase()) &&
          otherUser.username?.toLowerCase() !== user.username?.toLowerCase()
          )
      })
    );
    
  constructor(public UserService: UserService, private chatsService : ChatsService) {

     this.user$.subscribe((value) => {
       console.log(value);
     });
  }

  ngOnInit(): void {}

  createChat(otherUser: User) {
    console.log(otherUser)
    this.chatsService.createChat(otherUser).subscribe();
  }
}