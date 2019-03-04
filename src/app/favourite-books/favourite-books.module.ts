import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FavouriteBooksRoutingModule } from './favourite-books-routing.module';
import { FavouritesComponent } from './favourites.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    CommonModule,
    FavouriteBooksRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class FavouriteBooksModule { }
