import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Firestore, collectionData, collection, query, where, doc, docData } from '@angular/fire/firestore';
import { orderBy } from '@firebase/firestore';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public email: string = '';
  public signedIn: boolean = false;
  public profilePic: string = '';


  private firestore: Firestore

  item$: Observable<any[]>;
  constructor(firestore: Firestore) {
    this.firestore = firestore
  }

  get currentUser$(): Observable<User> {
    const ref = doc(this.firestore, 'user', this.email as string)
    return docData(ref, {idField: 'email'}) as Observable<User>
  }

  get allUsers$(): Observable<User[]> {
    let ref = collection(this.firestore, 'user');
    let queryall= query(ref);
    return collectionData(queryall, {idField: 'email'}) as Observable<User[]>
  }


  // test$() {
  //   const ref = collection(this.firestore, 'TECH');
  //   this.item$ = collectionData(ref);
  //   console.log(this.item$)
  // }
  
  
}


