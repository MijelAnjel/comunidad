import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemesService } from 'src/app/services/memes.service';
import Swal from 'sweetalert2';
import { PostI } from '../../../models/post';
import { Random } from '../../../models/categoria';
import { RandomService } from 'src/app/services/random.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit {

  private image: any;

  todoForm: FormGroup;
  createMode: boolean = true;
  todo: PostI;

  posts$: Observable<PostI[]>;

  editing: boolean = false;
  editingProduct: PostI;
  productsCollection: AngularFirestoreCollection;
  productDoc: AngularFirestoreDocument<PostI>;
  product = {} as PostI;



  constructor(private storage: AngularFireStorage,
    private router:Router,
    public sitios: PostService
    ) { }


    public newPostForm = new FormGroup({
      titlePost: new FormControl('', [Validators.required, Validators.minLength(4)]),
      contentPost: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      tagsPost: new FormControl('', Validators.required),
      imagePost: new FormControl('', Validators.required),
    });


    ngOnInit() {}


  ///////////////////////// IMAGENES //////////

    // Tarea para subir archivo
    public tareaCloudStorage(nombreArchivo: string, datos: any) {
      return this.storage.upload(nombreArchivo, datos);
    }

    // Referencia del archivo
    public referenciaCloudStorage(nombreArchivo: string) {
      return this.storage.ref(nombreArchivo);
    }



/* To copy Text from Textbox */
copyInputMessage(inputElement) {
  inputElement.select();
  document.execCommand('copy');
  inputElement.setSelectionRange(0, 0);
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




    addNewPost(data: PostI) {
      console.log('New post', data);
      this.sitios.preAddAndUpdatePost(data, this.image);

      if (this.newPostForm.valid) {
        (this.createMode)
          let todo: PostI = this.newPostForm.value;
          todo.lastModifiedDate = new Date();
          todo.createdDate = new Date();
          this.newPostForm.reset();
//        this.router.navigate(['/home']);
        this.newPostForm.reset();
        this.newPostForm.untouched;
        this.newPostForm.disable();
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
        this.newPostForm.untouched;
        this.newPostForm.disable();
        this.router.navigate(['/home']).finally();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡GRACIAS!',
          showConfirmButton: false,
          timer: 10500,
          html:
          'Gracias por <b>publicar nuevamente</b>, ' +
          '<a class="text-primary" href="/home">VUELVE A INICIO</a> ' +
          'para seguir navegando',
        });
      }

      if (this.createMode){
        let todo: PostI = this.newPostForm.value;
        todo.lastModifiedDate = new Date();
        todo.createdDate = new Date();
        this.newPostForm.reset();
        this.newPostForm.untouched;
        this.newPostForm.disable();
//        this.router.navigate(['/home']);
      } else{
        let todo: PostI = this.newPostForm.value;
        todo.id = this.todo.id;
        todo.lastModifiedDate = new Date();

        if (this.newPostForm === this.newPostForm)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
    }

    handleImage(event: any): void {
      this.image = event.target.files[0];
    }


}
