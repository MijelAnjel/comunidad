import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Random } from 'src/app/models/categoria';
import { RandomService } from 'src/app/services/random.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {
  random: Observable<Random[]>;

  editing: boolean = false;
  editingProduct: Random;
  productsCollection: AngularFirestoreCollection<Random>;
  productDoc: AngularFirestoreDocument<Random>;
  product = {} as Random;
  productos = {} as Random;

  constructor(private rand: RandomService) { }




  ngOnInit() {
    this.random = this.rand.getAllPosts();
  }


  // METODO FINAL PARA BORRAR ID O TIENDA
  deleteProduct(id: any): void {
     const confirmacion = confirm('¿Estás seguro que quieres borrar tu tienda?');
     if (confirmacion) {
       this.rand.deleteProduct(id);
     }
   }
   editProduct(event, product) {
       this.editingProduct = product;
       this.editing = !this.editing;
     }

      // METODO PARA MODIFICAR ITEM
  updateProduct(product: Random) {
    this.rand.updateProduct(this.editingProduct);
    this.editingProduct = {} as Random;
    this.editing = false;
  }

}
