import { Component } from '@angular/core';
import { DocumentReference, Firestore, collection, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/LoadingService';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/UserService';
import { Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';


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
    private location: Location,
    public userService: UserService,
    private http: HttpClient
  ) {}

  //validId: boolean = true
  verified: boolean | null = null
  verificationId: string;

  ngOnInit() {
    const verificationId = this.route.snapshot.queryParamMap.get('id') ?? '';
    console.log(verificationId)
    if (this.userService.needToVerify && verificationId == '') {
      return
    }
    if (verificationId != '') {
      this.LoadingService.loading = true
    } 
    else {
      this.router.navigate(['/'])
    }
    if (this.userService.needToVerify == null) {
      if (this.userService.signedIn) {
        this.router.navigate(['/'])
      }
    }
    // check firebase collection users and find which user has the field 'verificationId' with query param value
    const usersRef = collection(this.firestore, 'user')
    let user = query(usersRef, where('verificationId', '==', verificationId));
    getDocs(user).then((querySnapshot) => {
      console.log(querySnapshot.docs)
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

  redirectSignIn() {
    const options = { withCredentials: true };
    const data = {}
    const observer: Observer<any> = {
      next: response => {
        let user: User = response
        this.userService.email = user.email
        this.userService.profilePic = user.profilePic ?? this.userService.defaultProfilePic
        this.userService.signedIn = true
        this.router.navigate(['/'])
      },
      error: error => console.error(error),
      complete: () => console.log('complete')
    };
    this.http.post('http://api.broncomarketplace.com:8080/login/verified-email', data, options).subscribe(observer);
  }
}
