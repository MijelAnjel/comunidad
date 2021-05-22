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
import { invalid } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  private filePath: string;
  public userData$: Observable<firebase.User>;



    private currentUser: User;
    private userD$ = new BehaviorSubject<User>(null);


  public currentImage = 'currentImage';
  public image: FileA;



  constructor(public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
    this.userData$ = afAuth.authState;
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.auth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.auth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      this.checkUserIsVerified(user);
      this.router.navigate(['/home']);
      return user;
    } catch (error) {
      console.log(error);
      this.router.navigate(['/home']);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por ingresar',
        showConfirmButton: false,
        timer: 10500
      })
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      this.checkUserIsVerified(user);
      return user;
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Verifica tu correo',
        showConfirmButton: false,
        timer: 10500
      })
      this.router.navigate(['/home']);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role,
      edad: user.edad,
    };

    return userRef.set(data, { merge: true });
  }

  preSaveUserProfile(user: User, image?: FileA): void {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  private uploadImage(user: User, image: FileA): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.saveUserProfile(user);
          });
        })
      ).subscribe();
  }

  private saveUserProfile(user: User) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    })
      .then(() => console.log('User updated!'))
      .catch(err => console.log('Error', err));
  }



  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    photoURL: new FormControl('', Validators.required),
  });



  private initValuesForm(user: User): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
  }

  handleImage(image: FileA): void {
    this.image = image;
  }


  CurrentUser(): Observable<User> {
    return this.userD$.asObservable();
  }



  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sesión Iniciada Correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    } else if (user) {
      this.router.navigate(['/verification-email']);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Usuario no encontrado',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.router.navigate(['/register']);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salió mal, intenta nuevamente',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


}
