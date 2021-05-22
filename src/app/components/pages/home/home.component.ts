import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { RandomService } from 'src/app/services/random.service';
import { Random } from '../../../models/categoria';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categorias: Observable<Random[]>;


  constructor(private catG: CategoriaService,) { }

  ngOnInit() {
    this.categorias = this.catG.getAllPosts();
  }

}
