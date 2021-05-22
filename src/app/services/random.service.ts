import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FileI, Random } from '../models/categoria';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class RandomService {

  private postsCollection: AngularFirestoreCollection<Random>;
  private filePath: any;
  private downloadURL: Observable<string>;


  products: Observable<Random[]>;
  productDoc: AngularFirestoreDocument<Random>;
  productsCollection: AngularFirestoreCollection <Random>;


  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.productsCollection = this.afs.collection('categorias/random/publicaciones');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Random;
          data.id = a.payload.doc.id;
          return data;
        })
      ));
      this.postsCollection = afs.collection<Random>('categorias/random/publicaciones');

  }

  private todoCollectionName = 'categorias/random/publicaciones';

  public getAllPosts(): Observable<Random[]> {
    return this.afs.collection('categorias/random/publicaciones',
    ref => ref.orderBy('lastModifiedDate', 'desc'))
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

//    return this.afs.collection('categorias/random/publicaciones')
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
    return this.afs.doc<Random>(`categorias/random/publicaciones/${id}`).valueChanges();
  }

  updateProduct(product: Random) {
    this.productDoc = this.afs.doc(`categorias/random/publicaciones/${product.id}`);
    this.productDoc.set(product);
  }

  deleteProduct(product: Random) {
    this.productDoc = this.afs.doc(`categorias/random/publicaciones/${product.id}`);
    this.productDoc.delete();
  }

  addProduct(product: Random) {
    this.productsCollection.add(product);
  }




  getTodos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.afs.collection<Random>(this.todoCollectionName, ref => ref.orderBy('lastModifiedDate', 'desc')).get();
  }
  saveTodo(todo: Random): Promise<DocumentReference> {
    return this.afs.collection(this.todoCollectionName).add(todo);
  }
  editTodo(todo: Random): Promise<void>{
    return this.afs.collection(this.todoCollectionName).doc(todo.id).update(todo);
  }
  editTodoPartial(id: string, obj: Object): Promise<void>{
    return this.afs.collection(this.todoCollectionName).doc(id).update(obj);
  }
  deleteTodo(idTodo: string): Promise<void>{
    return this.afs.collection(this.todoCollectionName).doc(idTodo).delete();
  }

  public preAddAndUpdatePost(post: Random, image: FileI): void {
    this.uploadImage(post, image);
  }

  private savePost(post: Random) {
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost,
      createdDate: post.createdDate,
      lastModifiedDate: post.lastModifiedDate
    };

    if (post.id) {
      return this.postsCollection.doc(post.id).update(postObj);
    } else {
      return this.postsCollection.add(postObj);
    }

  }


  private uploadImage(post: Random, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.savePost(post);
          });
        })
      ).subscribe();
  }


}
