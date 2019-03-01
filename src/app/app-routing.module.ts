import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { FavouritesComponent } from './favourites/favourites.component';


const appRoutes: Routes = [
  { path: 'test', component: AppComponent },
  { path: 'book/:id', loadChildren: './book-details/book-details.module#BookDetailsModule' },
  { path: '',       redirectTo: '/search', pathMatch: 'full' },
  { path: 'search',   loadChildren: './book-search/book-search.module#BookSearchModule'},
  { path: 'favourites', component: FavouritesComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
