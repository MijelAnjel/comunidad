import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostI } from 'src/app/models/post';
import { MemesService } from 'src/app/services/memes.service';
import { PostService } from 'src/app/services/post.service';
import { Random } from '../../../models/categoria';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  random: Observable<PostI[]>;

  editing: boolean = false;
  editingProduct: PostI;
  productsCollection: AngularFirestoreCollection<PostI>;
  productDoc: AngularFirestoreDocument<PostI>;
  product = {} as PostI;
  productos = {} as PostI;

  constructor(private rand: MemesService) { }




  ngOnInit() {
    this.random = this.rand.getAllPosts();
  }


   editProduct(event, product) {
       this.editingProduct = product;
       this.editing = !this.editing;
     }




}
