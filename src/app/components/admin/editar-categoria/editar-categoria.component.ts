import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Random } from 'src/app/models/categoria';
import { RandomService } from 'src/app/services/random.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  todoForm: FormGroup;
  createMode: boolean = true;
  todo: Random;

  posts$: Observable<Random[]>;

  editing: boolean = false;
  editingProduct: Random;
  productsCollection: AngularFirestoreCollection;
  productDoc: AngularFirestoreDocument<Random>;
  product = {} as Random;

  constructor(public sitios: RandomService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.posts$ = this.sitios.getAllPosts();
    this.todoForm = this.formBuilder.group({
      p1: ['', Validators.required],
      np: ['', Validators.required],
      done: false
    });

    if (!this.createMode) {
      this.loadTodo(this.todo);
    }
  }

  // METODO FINAL PARA BORRAR ID O TIENDA
  deleteProduct(event, product): void {
    const confirmacion = confirm('¿Estás seguro que quieres borrar esto?');
    if (confirmacion) {
      this.sitios.deleteProduct(product);
    }
  }
    editProduct(event, product) {
        this.editingProduct = product;
        this.editing = !this.editing;
      }

       // METODO PARA MODIFICAR ITEM
   updateProduct(product: Random) {
     this.sitios.updateProduct(this.editingProduct);
     this.editingProduct = {} as Random;
     this.editing = false;
   }

   addProduct() {
      this.sitios.addProduct(this.product);
      this.product = {} as Random;
  }

    //GAVILANCH
    loadTodo(todo){
      this.todoForm.patchValue(todo)
    }

    saveTodo() {
      if (this.todoForm.invalid) {
        return;
      }

      if (this.createMode){
        let todo: Random = this.todoForm.value;
        todo.lastModifiedDate = new Date();
        todo.createdDate = new Date();
        this.sitios.saveTodo(todo);
      } else{
        let todo: Random = this.todoForm.value;
        todo.id = this.todo.id;
        todo.lastModifiedDate = new Date();
        this.sitios.editTodo(todo);
      }

    }



  }
