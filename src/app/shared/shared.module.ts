import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginationIntlService } from './paginator-i18';
import { LayoutModule } from '@angular/cdk/layout'

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
  MatSelectModule,
  MatPaginatorIntl,
  MatExpansionModule,
} from '@angular/material';


@NgModule({
  exports: [
    CommonModule,
    MatExpansionModule,
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
    LayoutModule
  ],

  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginationIntlService }]
})
export class SharedModule { }