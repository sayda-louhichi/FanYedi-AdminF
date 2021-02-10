import { Injectable } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from'firebase/app';
import { stringify } from 'querystring';
import { BehaviorSubject, Observable } from 'rxjs';
import{User} from 'src/app/model/user'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private eventAuthError= new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
newUser:any;
users: Observable<any[]>;

  isLoggedIn =false ;
  
  constructor(public firebaseAuth:AngularFireAuth, private firestore: AngularFirestore,private router: Router) {
    this.users = firestore.collection('User').valueChanges( {idField: 'UserId' });
  }
  
deleteProduct(productId: string){
  this.firestore.doc('Products/' + productId).delete()
}
deleteUser(UserId: string){
  this.firestore.doc('User/' + UserId).delete()
}

  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res =>{
      this.isLoggedIn =true 
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
  createUser(user) {
    console.log(user);
    this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/list-artisans']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
  
    return this.firestore.doc(`User/${userCredential.user.uid}`).set({
    
      UserEmail: this.newUser.email,
      //UserId:this.newUser.idField,
      UserName: this.newUser.UserName,
      UserNumber: this.newUser.UserNumber,
      UserAddress:this.newUser.UserNumber,
    
    })
  }
  
    /*async signup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res =>{
      this.isLoggedIn =true 
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }*/
   logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
    this.router.navigate([''])
  }
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.firebaseAuth.signInWithPopup(provider)
      .then( res=>{
        resolve(res);
        this.router.navigate(['/home'])
      })
    })
  }
  
}
