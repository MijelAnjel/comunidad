import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { FileA } from '../models/filea';
import { User } from '../models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthDosService {

  // tslint:disable-next-line:variable-name
  private _userData: Observable<firebase.User>;

  private currentUser: UserData;
  private currentUser$ = new BehaviorSubject<UserData>(null);

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore) {
    this._userData = afAuth.authState;

    this._userData.subscribe(user => {
      if (user) {
        this.afs.collection<UserData>('users')
          .doc<UserData>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            this.currentUser = currentUser;
            this.currentUser$.next(currentUser);
          });
      }
    });

  }

  CurrentUser(): Observable<UserData> {
    return this.currentUser$.asObservable();
  }


  SignUp(email: string,
         password: string,
         firstName: string,
         lastName: string,
         avatar = 'https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png'): void {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res) {
          this.afs.collection('users').doc(res.user.uid)
            .set({
              firstName,
              lastName,
              email,
              avatar
            }).then(value => {
            this.afs.collection<UserData>('users')
              .doc<UserData>(res.user.uid)
              .valueChanges()
              .subscribe(user => {
                console.log(user);
                if (user) {
                  this.currentUser$.next(user);
                }
              });

          });
        }
      })
      .catch(err => console.log(`Something went wrong ${err.message}`));
  }

  get userData(): Observable<firebase.User> {
    return this._userData;
  }

  SignIn(email: string, password: string): void {
    console.log(email, password);

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this._userData = this.afAuth.authState;

        this.afs.collection<UserData>('users')
          .doc<UserData>(res.user.uid)
          .valueChanges()
          .subscribe((user) => {
            console.log(user);
            // @ts-ignore
            this.currentUser = user;
            this.currentUser$.next(this.currentUser);
          });


      }).catch(err => console.log(err.message));
  }

  Logout(): void {
    this.afAuth.auth.signOut().then(res => {
      console.log(res);
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigateByUrl('/login').then();
    });
  }

  searchUserInDatabase(user_id: string): Observable<UserData> {
    return this.afs.collection<UserData>('users').doc<UserData>(user_id).valueChanges();
  }



}

export interface UserData {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  id?: string;
  uid?: string;
}
