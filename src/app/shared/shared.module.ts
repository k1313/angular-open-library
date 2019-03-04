import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';


@NgModule({
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }