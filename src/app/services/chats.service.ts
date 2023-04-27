import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable, concatMap, map, take } from 'rxjs';
import { UserService } from './UserService';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  public loading: boolean = false;

  constructor(private firestore: Firestore, private userService : UserService) {

  }

  createChat(otherUser: any) : Observable<string> {
    const ref = collection(this.firestore, 'chats');
    return this.userService.currentUser$.pipe(
      take(1),
      concatMap(user => addDoc(ref, {
        userIds: [user?.email, otherUser?.email],
        users: [
          {
            username: user?.username ?? '',
            profilePic: user?.profilePic ?? ''
          },
          {
            username: user?.username ?? '',
            profilePic: user?.profilePic ?? ''
          }
        ]
      })),
      map(ref => ref.id)
    )
  }

}
