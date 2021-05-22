import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Random } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  products: Observable<Random[]>;
  productDoc: AngularFirestoreDocument<Random>;
  productsCollection: AngularFirestoreCollection <Random>;


  constructor(private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection('colaboradores');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Random;
          data.id = a.payload.doc.id;
          return data;
        })
      ));
  }


  public getAllPosts(): Observable<Random[]> {
    return this.afs.collection('colaboradores',
    ref => ref.orderBy('p1', 'asc'))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Random;
          const id = a.payload.doc.id;
          return { id, ...data};
        })
      )
    );

//    return this.afs.collection('colaboradores')
//    .snapshotChanges()
//    .pipe(
//      map(actions =>
//        actions.map(a => {
//          const data = a.payload.doc.data() as Random;
//          const id = a.payload.doc.id;
//          return { id, ...data};
//        })
//      )
//    );
  }


  public getOnePost(id: Random): Observable<Random> {
    return this.afs.doc<Random>(`colaboradores/${id}`).valueChanges();
  }

  updateProduct(product: Random) {
    this.productDoc = this.afs.doc(`colaboradores/${product.id}`);
    this.productDoc.set(product);
  }

  deleteProduct(product: Random) {
    this.productDoc = this.afs.doc(`colaboradores/${product.id}`);
    this.productDoc.delete();
  }

  addProduct(product: Random) {
    this.productsCollection.add(product);
  }


}
