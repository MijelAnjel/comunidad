import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatIconModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* ANG MATERIAL */
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';



import {MatListModule} from '@angular/material/list';

import {MatPaginatorModule} from '@angular/material/paginator';



import {MatTableModule} from '@angular/material/table';

import { CdkTableModule} from '@angular/cdk/table';


const myModule = [
  MatTabsModule,
  MatCardModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatListModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatTabsModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatListModule,
  MatStepperModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  CdkTableModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    FormsModule],
  exports: [myModule]
})
export class MaterialModule { }
