import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDetailsRoutingModule } from './book-details-routing.module';
import { BookDetailsComponent } from './book-details.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BookDetailsComponent],
  imports: [
    CommonModule,
    BookDetailsRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class BookDetailsModule { }
