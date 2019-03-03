import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FavouriteBooksRoutingModule } from './favourite-books-routing.module';
import { FavouritesComponent } from './favourites.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    CommonModule,
    FavouriteBooksRoutingModule,
    MaterialModule,
    TranslateModule.forChild()
  ]
})
export class FavouriteBooksModule { }
