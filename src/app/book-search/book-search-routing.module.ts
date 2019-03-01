import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { BookSearchComponent } from './book-search.component';


@Injectable({
  providedIn: 'root'
})
class Ttt implements CanActivate {
  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let q = next.params.query || '';
    let resultPerPage = +localStorage.getItem('booksPerPage') || 10;
    this.router.navigateByUrl(`/search/${q}/1/${resultPerPage}`);
    return false;
  }
}

const routes: Routes = [
  { 'path': '', component: BookSearchComponent },
  { 'path': ':query', 'canActivate' : [Ttt] },
  { 'path': ':query/:page/:limit', component: BookSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookSearchRoutingModule { }
