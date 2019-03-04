import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'search',   loadChildren: './book-search/book-search.module#BookSearchModule'},
  { path: 'book/:id', loadChildren: './book-details/book-details.module#BookDetailsModule' },
  { path: 'favourites', loadChildren: './favourite-books/favourite-books.module#FavouriteBooksModule'},
  { path: '',       redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
