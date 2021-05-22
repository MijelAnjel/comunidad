import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Random } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ofertas = [];
  editingOfertas: Random;
  oferta: any;

  displayedColumns: string[] = ['img1', 'p1'];
  dataSource = new MatTableDataSource();


  posts$: Observable<Random[]>;

  editing: boolean = false;
  editingProduct: Random;
  productsCollection: AngularFirestoreCollection;
  productDoc: AngularFirestoreDocument<Random>;
  product = {} as Random;



  constructor(
    private catG: CategoriaService,
    private afs: AngularFirestore
    ) { }


  ngOnInit() {
    // ACA ABAJO METODO DE MAT TABLE LISTA
    this.catG.getAllPosts().subscribe(ofertas => (this.dataSource.data = ofertas));
    this.catG.getAllPosts().subscribe(ofertas => {this.ofertas = ofertas;});
    this.dataSource.sort = this.sort;
    this.afs.collection('lista').valueChanges().subscribe(val => console.log(val));
  }



// metodo para mat table
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtro() {
    this.afs.collection('/lista', ref => ref.where('np', '==', 'p1'))
    .snapshotChanges()
    .subscribe((snapshot: any) => this.product = snapshot.map(snap => ({ ...snap })));
  }
  getWorker() {
    return this.afs.collection('lista').ref.where('np', '==', 'p1');
  }



}
