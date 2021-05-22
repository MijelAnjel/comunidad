import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { CategoriaComponent } from './components/pages/categoria/categoria.component';
import { PublicacionesComponent } from './components/pages/publicaciones/publicaciones.component';
import { CrearPublicacionComponent } from './components/pages/crear-publicacion/crear-publicacion.component';
import { AnimeComponent } from './components/pages/categoria/anime/anime.component';
import { HomeModule } from './components/pages/home/home.module';
import { PreguntasComponent } from './components/pages/categoria/preguntas/preguntas.component';
import { ListadoComponent } from './components/pages/listado/listado.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerAppComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'anime',
        component: AnimeComponent
      },
      {
        path: 'categoria/:id',
        component: CategoriaComponent
      },
      { path: 'random',
      loadChildren: () => import('./components/pages/categoria/random/random.module').then(m => m.RandomModule)
      },
      {
        path: 'preguntas',
        component: PreguntasComponent
      },
      {
        path: 'publicaciones',
        component: PublicacionesComponent
      },
      {
        path: 'listado-categorias',
        component: ListadoComponent
      },
      {
        path: 'crear',
        component: CrearPublicacionComponent
      },
      { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
      { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
      { path: 'profile', loadChildren: () => import('./components/pages/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'memes', loadChildren: () => import('./components/pages/categoria/memes/memes.module').then(m => m.MemesModule) },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: '/home', pathMatch: 'full'}
    ]
  },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
//  { path: 'logines', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
