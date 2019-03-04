import { NgModule } from '@angular/core';

import { BookSearchRoutingModule } from './book-search-routing.module';
import { BookSearchComponent } from './book-search.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BookSearchComponent],
  imports: [
    SharedModule,
    BookSearchRoutingModule,
    TranslateModule.forChild()
  ]
})
export class BookSearchModule { }
