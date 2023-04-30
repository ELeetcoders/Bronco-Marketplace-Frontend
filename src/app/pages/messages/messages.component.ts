import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, of, startWith, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/UserService';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  @ViewChild('endOfChat') endOfChat: ElementRef;

  searchControl = new FormControl('');
  chatListControl = new FormControl();
  messageControl = new FormControl('');

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
    
    myChats$ = this.chatsService.myChats$;

    selectedChat$ = combineLatest([
      this.chatListControl.valueChanges,
      this.myChats$
    ]).pipe(
      map(([value, chats]) => {
        return chats.find(c => c.id === value[0]);
      })
    );

    messages$ = this.chatListControl.valueChanges.pipe(
      map(value => value[0]),
      switchMap(chatId => this.chatsService.getChatMessages$(chatId)),
      tap(() => {
        this.scrollToBottom()
      })
    )

    constructor(
      private UserService: UserService,
      private chatsService : ChatsService
      ) {}

  ngOnInit(): void {
  }

  createChat(otherUser: User) {
    this.chatsService.isExistingChat(otherUser?.email).pipe(
      switchMap(chatId => {
        if (chatId) {
          return of(chatId);
        } else {
          return this.chatsService.createChat(otherUser);
        }
      })
    ).subscribe(chatId => {
      this.chatListControl.setValue([chatId]);
    })
  }

  sendMessage() {
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value[0];

    if (message && selectedChatId) {
      this.chatsService.addChatMessage(selectedChatId, message).subscribe(() => {
        this.scrollToBottom();
      });

      this.messageControl.setValue('');
    }
  }

  scrollToBottom() {
    setTimeout(() =>{
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({behavior: "smooth"})
      }
    }, 100)
  }
}