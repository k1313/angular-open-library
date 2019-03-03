import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookSearchRoutingModule } from './book-search-routing.module';
import { BookSearchComponent } from './book-search.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BookSearchComponent],
  imports: [
    CommonModule,
    BookSearchRoutingModule,
    MaterialModule,
    TranslateModule.forChild()
  ]
})
export class BookSearchModule { }
