import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith, tap } from 'rxjs';
import { Chat } from 'src/app/models/Chats';
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
  chatListControl = new FormControl();

  user$ = this.UserService.currentUser$

  users$ = combineLatest([
    this.UserService.allUsers$, 
    this.user$, 
    this.searchControl.valueChanges.pipe(startWith(''))]).pipe(
      map(([users, user, searchString]) => {
        return users.filter(
          (otherUser) =>
          otherUser.username?.toLowerCase().includes(searchString!.toLowerCase()) &&
          otherUser.username?.toLowerCase() !== user.username?.toLowerCase()
          )
      })
    );
    
    myChats$ = this.chatsService.myChats$.pipe(
      tap(chats=>console.log('myChats$ emitted', chats))
    );

    selectedChat$ = combineLatest([
      this.chatListControl.valueChanges.pipe(startWith('empty')),
      this.myChats$.pipe(startWith([]))
    ]).pipe(
      tap(([value, chats]) => console.log('combineLatest emitted', value, chats)),
      map(([value, chats]) => {
        console.log('map emitted', value, chats);
        return chats.find(c => c.id === value[0]);
      })
    );

    constructor(
      private UserService: UserService,
      private chatsService : ChatsService
      ) {}

  ngOnInit(): void {
    console.log('MessagesComponent initialized');
  }

  createChat(otherUser: User) {
    console.log(otherUser)
    this.chatsService.createChat(otherUser).subscribe();
  }

  selectChat(chat: Chat) {
    this.selectedChat$ = combineLatest([
      this.myChats$,
      chat.id
    ]).pipe(
      map(([chats, c]) => {
        return chats.find(c => c.id === chat.id)
      })
    )
  }

}