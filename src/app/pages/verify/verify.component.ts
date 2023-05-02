import { Component } from '@angular/core';
import { DocumentReference, Firestore, collection, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/LoadingService';
import { Location } from '@angular/common';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    public LoadingService: LoadingService,
    private router: Router,
    private location: Location
  ) {}

  validId: boolean = true
  verified: boolean | null = null

  ngOnInit() {
    this.LoadingService.loading = true
    const verificationId = this.route.snapshot.queryParamMap.get('id');
    console.log(verificationId)
    // check firebase collection users and find which user has the field 'verificationId' with query param value
    const usersRef = collection(this.firestore, 'user')
    let user = query(usersRef, where('verificationId', '==', verificationId));
    getDocs(user).then((querySnapshot) => {
      //console.log(querySnapshot.docs[0].data())
      if (querySnapshot.size != 0) {
        const docRef = querySnapshot.docs[0].ref
        updateDoc(docRef, {verificationId: null, verified: true});
        this.verified = true
      }
      else {
        this.verified = false
      }
      this.LoadingService.loading = false
    })
    //get query param value from url in angular location
    // check firebase collection users and find which user has the field 'verificationId' with query param value
    // once found the user, remove fields verificationId and verify
    // refresh the page
  }

  redirectHome() {
    this.router.navigate(['/']).then(() => {
      //idk
    });
  }
}
