import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Firestore, collectionData, collection, query, where, doc, docData } from '@angular/fire/firestore';
import { orderBy } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public username: String = '';
  public firstName: String = '';
  public lastName: String = '';
  public email: String = 'Not signed in';

  private firestore: Firestore

  item$: Observable<any[]>;
  constructor(firestore: Firestore) {
    this.firestore = firestore
  }

  get currentUser$(): Observable<any[]> {
    const ref = doc(this.firestore, 'user', 'mmt@cpp.edu')
    return docData(ref) as Observable<any[]>;
  }

  get allUsers$(): Observable<any[]> {
    let ref = collection(this.firestore, 'user');
    let queryall= query(ref);
    return collectionData(queryall) as Observable<any[]>
  }


  // test$() {
  //   const ref = collection(this.firestore, 'TECH');
  //   this.item$ = collectionData(ref);
  //   console.log(this.item$)
  // }
  
  
}


