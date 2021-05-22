import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '',
  component: AdminComponent,
  children: [
    { path: 'editar-categoria', loadChildren: () => import('../../components/admin/editar-categoria/editar-categoria.module').then(m => m.EditarCategoriaModule) },
  ]
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


