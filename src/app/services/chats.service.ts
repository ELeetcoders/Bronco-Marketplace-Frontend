import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, documentId } from '@angular/fire/firestore';
import { Observable, concatMap, map, take } from 'rxjs';
import { UserService } from './UserService';
import { User } from '../models/User';

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
            profilepic: user.profilepic ?? ''
          },
          {
            username: otherUser.username ?? '',
            profilepic : user.profilepic ?? ''
          }
        ]
      })),
      map(ref => ref.id)
    )
  }

}
