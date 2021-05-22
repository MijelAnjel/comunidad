import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileA } from 'src/app/models/filea';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public image: FileA;
  public currentImage = 'currentImage';

  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);

    });
  }

  onSaveUser(user: User): void {
    this.authSvc.preSaveUserProfile(user, this.image);
  }

  private initValuesForm(user: User): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL
    });
  }

  handleImage(image: FileA): void {
    this.image = image;
  }

}
