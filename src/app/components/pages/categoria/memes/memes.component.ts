import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Memes } from 'src/app/models/categoria';
import { AuthService } from 'src/app/services/auth.service';
import { MemesService } from 'src/app/services/memes.service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {

  memes: Observable<Memes[]>;

  editing: boolean = false;
  editingProduct: Memes;
  productsCollection: AngularFirestoreCollection<Memes>;
  productDoc: AngularFirestoreDocument<Memes>;
  product = {} as Memes;
  productos = {} as Memes;

  constructor(private rand: MemesService, public authSvc: AuthService) { }




  ngOnInit() {
    this.memes = this.rand.getAllPosts();
  }




}
