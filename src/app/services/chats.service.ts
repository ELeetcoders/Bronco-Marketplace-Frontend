import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, collectionData, doc, documentId, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable, concatMap, map, take } from 'rxjs';
import { UserService } from './UserService';
import { User } from '../models/User';
import { Chat, Message } from '../models/Chats';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  public loading: boolean = false;

  constructor(private firestore: Firestore, private userService : UserService) {

  }

  createChat(otherUser: User) : Observable<string> {
    const ref = collection(this.firestore, 'chats');
    return this.userService.currentUser$.pipe(
      take(1),
      concatMap(user => addDoc(ref, {
        userEmails: [user.email, otherUser.email],
        users: [
          {
            username: user.username ?? '',
            profilepic: user.profilePic ?? this.userService.defaultProfilePic
          },
          {
            username: otherUser.username ?? '',
            profilepic : user.profilePic ?? this.userService.defaultProfilePic
          }
        ]
      })),
      map(ref => ref.id)
    )
  }

  get myChats$(): Observable<Chat[]> {
    const ref = collection(this.firestore, 'chats');
    return this.userService.currentUser$.pipe(
      concatMap((user) => {
        const myquery = query(ref, where('userEmails', 'array-contains', user?.email))
        return collectionData(myquery, {idField: 'id'}).pipe(
          map(chats => this.addChatNameAndPic(user.email, chats as Chat[]))
        ) as Observable<Chat[]>
      })
    );
  }

  addChatMessage(chatId: string, message: string): Observable<any> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const chatRef = doc(this.firestore, 'chats', chatId);
    const today = Timestamp.fromDate(new Date());
    return this.userService.currentUser$.pipe(
      take(1),
      concatMap((user) => addDoc(ref, {
        text: message,
        senderId: user?.email,
        sentDate: today
      })),
      concatMap(() => 
      updateDoc(chatRef, {lastMessage: message, lastMessageDate: today}))
    )
  }

  getChatMessages$(chatId: string) : Observable<Message[]>{
    const ref = collection(this.firestore, 'chats', chatId, 'messages')
    const queryAll = query(ref, orderBy('sentDate', 'asc'))
    return collectionData(queryAll) as Observable<Message[]>
  }

  addChatNameAndPic(currentUserEmail: string, chats: Chat[]) : Chat[] {
  chats.forEach(chat => {
    const otherIndex = chat.userEmails.indexOf(currentUserEmail) === 0 ? 1 : 0;
    const {username,  profilePic} = chat.users[otherIndex];
    chat.chatName = username;
    chat.chatPic = profilePic;
  }) 
  
  return chats;
  }
}
