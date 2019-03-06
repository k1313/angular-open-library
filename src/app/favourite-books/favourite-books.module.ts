import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { FavouriteBooksRoutingModule } from './favourite-books-routing.module';
import { FavouritesComponent } from './favourites.component';


@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    SharedModule,
    FavouriteBooksRoutingModule,
    TranslateModule.forChild()
  ]
})
export class FavouriteBooksModule {
}
