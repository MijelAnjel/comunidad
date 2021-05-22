import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Random } from 'src/app/models/categoria';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { RandomService } from 'src/app/services/random.service';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  private image: any;


  todoForm: FormGroup;
  createMode: boolean = true;
  todo: Random;

  posts$: Observable<Random[]>;

  editing: boolean = false;
  editingProduct: Random;
  productsCollection: AngularFirestoreCollection;
  productDoc: AngularFirestoreDocument<Random>;
  product = {} as Random;

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public URLlogo = '';
  public porcentaje = 0;
  public finalizado = false;

  constructor(
    private storage: AngularFireStorage,
    public authSvc: AuthService,
    private router:Router,
    public sitios: RandomService,
    private formBuilder: FormBuilder,
    private postSvc: PostService) { }




    public newPostForm = new FormGroup({
      titlePost: new FormControl('', [Validators.required, Validators.minLength(4)]),
      contentPost: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      tagsPost: new FormControl('', Validators.required),
      imagePost: new FormControl('', Validators.required),
    });





    ngOnInit() {
      this.posts$ = this.sitios.getAllPosts();
      this.todoForm = this.formBuilder.group({
        p1: ['', Validators.required],
        np: ['', Validators.required],
        imagePost: ['', Validators.required],
        done: false
      });

      if (!this.createMode) {
        this.loadTodo(this.todo);
      }
    }


  ///////////////////////// IMAGENES //////////

    // Tarea para subir archivo
    public tareaCloudStorage(nombreArchivo: string, datos: any) {
      return this.storage.upload(nombreArchivo, datos);
    }

    // Referencia del archivo
    public referenciaCloudStorage(nombreArchivo: string) {
      return this.storage.ref(nombreArchivo);
    }

  // Evento que se gatilla cuando el input de tipo archivo cambia SUBIR FOTO
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  // Sube el archivo IMAGEN DE PRODUCTO a Cloud Storage
  public subirArchivo() {
    const archivo = this.datosFormulario.get('archivo');
    const referencia = this.referenciaCloudStorage(this.nombreArchivo);
    const tarea = this.tareaCloudStorage(this.nombreArchivo, archivo);

    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      // tslint:disable-next-line: triple-equals
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
    });
  }

   // Sube el LOGO archivo a Cloud Storage
   public subirLogo() {
    const archivo = this.datosFormulario.get('archivo');
    const referencia = this.referenciaCloudStorage(this.nombreArchivo);
    const tarea = this.tareaCloudStorage(this.nombreArchivo, archivo);

    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      // tslint:disable-next-line: triple-equals
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLlogo = URL;
    });
  }

/* To copy Text from Textbox */
copyInputMessage(inputElement) {
  inputElement.select();
  document.execCommand('copy');
  inputElement.setSelectionRange(0, 0);
}



  // METODO PARA PUBLICACION

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

 //   saveTodo() {
  //    if (this.todoForm.invalid) {
  //      return Swal.fire({
  //        position: 'center',
  //        icon: 'error',
  //        title: 'Por favor, rellena bien los campos para enviar el mensaje',
  //        showConfirmButton: false,
  //        timer: 3500
  //      });

  //    }

  //    if (this.createMode){
  //      let todo: Random = this.todoForm.value;
  //      todo.lastModifiedDate = new Date();
  //      todo.createdDate = new Date();
  //      this.sitios.saveTodo(todo);

  //    } else{
  //      let todo: Random = this.todoForm.value;
  //      todo.id = this.todo.id;
  //      todo.lastModifiedDate = new Date();
  //      this.sitios.editTodo(todo);
  //      this.todoForm.reset();
 //       Swal.fire({
 //         position: 'center',
 //         icon: 'success',
 //         title: 'Muchas gracias por tu mensaje, te responderemos a la brevedad',
 //         showConfirmButton: false,
 //         timer: 5500
 //       });
 //     }

 //   }




    addNewPost(data: Random) {
      console.log('New post', data);
      this.postSvc.preAddAndUpdatePost(data, this.image);

      if (this.newPostForm.valid) {
        this.router.navigate(['/home']);
        this.newPostForm.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡GRACIAS!',
          showConfirmButton: false,
          timer: 10500,
          html:
          'Vuelve al inicio <b>AQUÍ</b>, ' +
          '<a class="text-primary" href="/home">INICIO</a> ' +
          'para seguir navegando',
        });
//        this.newPostForm.untouched;
//        this.newPostForm.disable();
//        this.router.navigate(['/home']).finally();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No puedes publicar tantas veces seguidas',
          showConfirmButton: true,
          timer: 3500
        });
      }

      if (this.createMode){
        let todo: Random = this.newPostForm.value;
        todo.lastModifiedDate = new Date();
        todo.createdDate = new Date();
        this.sitios.saveTodo(todo);
        this.newPostForm.reset();
        this.router.navigate(['/home']);
      } else{
        let todo: Random = this.newPostForm.value;
        todo.id = this.todo.id;
        todo.lastModifiedDate = new Date();
        this.sitios.editTodo(todo);
      }
    }

    handleImage(event: any): void {
      this.image = event.target.files[0];
    }


    onLogout(): void {
      this.authSvc.logout();
    }

}
