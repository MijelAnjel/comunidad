import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarCategoriaRoutingModule } from './editar-categoria-routing.module';
import { EditarCategoriaComponent } from './editar-categoria.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditarCategoriaComponent],
  imports: [
    CommonModule,
    EditarCategoriaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditarCategoriaModule { }
