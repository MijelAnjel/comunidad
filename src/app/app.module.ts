import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* FIREBASE */
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import {AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { CategoriaComponent } from './components/pages/categoria/categoria.component';
import { HeaderComponent } from './shared/header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicacionesComponent } from './components/pages/publicaciones/publicaciones.component';
import { CrearPublicacionComponent } from './components/pages/crear-publicacion/crear-publicacion.component';
import { PublicarComponent } from './components/pages/publicar/publicar.component';
import { AnimeComponent } from './components/pages/categoria/anime/anime.component';
import { PreguntasComponent } from './components/pages/categoria/preguntas/preguntas.component';
import { ListadoComponent } from './components/pages/listado/listado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [
    AppComponent,
    ContainerAppComponent,
    CategoriaComponent,
    HeaderComponent,
    PublicacionesComponent,
    CrearPublicacionComponent,
    PublicarComponent,
    AnimeComponent,
    PreguntasComponent,
    ListadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AngularFireAuth,
    { provide: BUCKET, useValue: 'publicamiwea.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
