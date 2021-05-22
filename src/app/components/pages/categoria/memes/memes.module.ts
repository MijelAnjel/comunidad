import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemesRoutingModule } from './memes-routing.module';
import { MemesComponent } from './memes.component';


@NgModule({
  declarations: [MemesComponent],
  imports: [
    CommonModule,
    MemesRoutingModule
  ]
})
export class MemesModule { }
