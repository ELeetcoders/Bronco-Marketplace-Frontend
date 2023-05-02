import { AfterViewInit, Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, of, startWith, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthGuardService } from 'src/app/services/AuthGuardService';
import { ProductDetailService } from 'src/app/services/ProductDetailService';
import { UserService } from 'src/app/services/UserService';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class MessagesComponent implements AfterViewInit{

  constructor(
    private UserService: UserService,
    private chatsService : ChatsService,
    private authGuard: AuthGuardService,
    private ProductDetailService: ProductDetailService
    ) {}
    
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
    
    myChats$ = this.chatsService.myChats$

    // use tap() to display once gotten values
    // myChats$ = this.chatsService.myChats$.pipe(
    //   tap(value => {
    //     console.log('myChats$ emitted:', value);
    //   })
    // );
    

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

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    console.log("fuckkkkkkkkkkkkkkk")
    combineLatest([this.myChats$, of(null)]).subscribe(([myChats, _]) => {
      console.log('myChats$ is done');
      const element = document.getElementById(this.ProductDetailService.chatId);
      console.log(element)
      if (element && this.ProductDetailService.chatId != '') {
        element.click()
        this.ProductDetailService.chatId = ''
      }
    });
    //this.myInput.nativeElement.focus();
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
      this.ProductDetailService.chatId = chatId
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