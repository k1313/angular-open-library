import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { FavouritesComponent } from './favourites/favourites.component';


const appRoutes: Routes = [
  { path: 'test', component: AppComponent },
  { path: 'book/:id', component: DetailsComponent },
  { path: '',       component: HomeComponent, pathMatch: 'full' },
  { path: 'favourites', component: FavouritesComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
