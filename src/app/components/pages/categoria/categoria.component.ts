import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Random } from 'src/app/models/categoria';
import { PostI } from 'src/app/models/post';
import { RandomService } from 'src/app/services/random.service';
import { MemesService } from '../../../services/memes.service';
import { AnimeService } from '../../../services/anime.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  pageId = '/categoria/:id';


  public random: Observable<Random>;
  public meme: Observable<PostI>
  public anime: Observable<PostI>



  constructor(
    private route: ActivatedRoute,
    private rand: RandomService,
    private memes: MemesService,
    private anim: AnimeService
    ) { }

  ngOnInit() {
    this.initDisqus();
    const idPost = this.route.snapshot.params.id;
    this.random = this.rand.getOnePost(idPost);
    this.meme = this.memes.getOnePost(idPost);
    this.anime = this.anim.getOnePost(idPost);
  }


  initDisqus() {
    const disqusconfig = function() {
    this.page.url = 'http://publicamiwea.web.app/categoria/' + window.location.pathname;
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

}
