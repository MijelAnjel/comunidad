import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicarComponent } from './publicar.component';

const routes: Routes = [{ path: '', component: PublicarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicarRoutingModule { }
