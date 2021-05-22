import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { PostI } from '../../../../models/post';
import { AnimeService } from '../../../../services/anime.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})


export class AnimeComponent implements OnInit {
  @ViewChild ('closeBtn', {static: true}) closeBtn: ElementRef;

  private image: any;

  todoForm: FormGroup;
  createMode: boolean = true;
  todo: PostI;

  anime: Observable<PostI[]>;



  constructor(private anim: AnimeService, private router:Router, public authSvc: AuthService,) { }

  public newPostForm = new FormGroup({
    titlePost: new FormControl('', [Validators.required, Validators.minLength(4)]),
    contentPost: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.anime = this.anim.getAllPosts();
    this.initDisqus();
  }


  //METODO PARA INICIAR DISQUS -COMENTARIOS
  initDisqus() {
    const disqusconfig = function() {
    this.page.url = 'https://www.publicamiwea.web.app/anime' + window.location.pathname;
    this.page.identifier = window.location.pathname;
    };
    // tslint:disable-next-line: only-arrow-functions
    (function() {
    // tslint:disable-next-line: one-variable-per-declaration
    const d = document, s = d.createElement('script');
    s.src = 'https://publicamiwea.disqus.com/embed.js';
    s.setAttribute('data-timestamp', '' + new Date());
    (d.head || d.body).appendChild(s);
    })();
    }



    //METODO PARA PUBLICAR POST

    loadTodo(todo){
      this.todoForm.patchValue(todo)
    }

    //CREAR NUEVO POST
    addNewPost(data: PostI) {
      console.log('New post', data);
      this.anim.preAddAndUpdatePost(data, this.image);

      if (this.newPostForm.valid) {
        (this.createMode)
          let todo: PostI = this.newPostForm.value;
          todo.lastModifiedDate = new Date();
          todo.createdDate = new Date();
          this.newPostForm.reset();
          this.closeModal();
//        this.router.navigate(['/home']);
        this.newPostForm.reset();
        this.newPostForm.untouched;
        this.newPostForm.invalid;
        this.newPostForm.disabled;
        this.newPostForm.disable();
        this.closeModal();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡GRACIAS!',
          showConfirmButton: false,
          timer: 10500,
          html:
          'Gracias por publicar <b>Puedes volver al foro haciendo click en la X de la parte superior derecha </b>, ' +
          '' +
          '',
        });
        this.newPostForm.reset();
        this.newPostForm.untouched;
        this.newPostForm.disabled;
        this.newPostForm.invalid;
        this.newPostForm.disable();
        this.router.navigate(['/anime']).finally();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡GRACIAS!',
          showConfirmButton: false,
          timer: 10500,
          html:
          'No puedes <b>publicar tantas veces seguidas</b>, ' +
          '<a class="text-primary" routerLink="/anime">VUELVE A INICIO</a> ' +
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


    //METODO PARA CERRAR MODAL CON VIEWCHILD, PERO NO FUNCIONA
           //call this wherever you want to close modal
           private closeModal(): void {
            this.closeBtn.nativeElement.click();
        }

}
