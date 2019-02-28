import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookSearchRoutingModule } from './book-search-routing.module';
import { BookSearchComponent } from './book-search.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [BookSearchComponent],
  imports: [
    CommonModule,
    BookSearchRoutingModule,
    MaterialModule
  ]
})
export class BookSearchModule { }
