import {NgModule} from '@angular/core';

import {BookDetailsRoutingModule} from './book-details-routing.module';
import {BookDetailsComponent} from './book-details.component';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [BookDetailsComponent],
  imports: [
    SharedModule,
    BookDetailsRoutingModule,
    TranslateModule.forChild()
  ]
})
export class BookDetailsModule {
}
