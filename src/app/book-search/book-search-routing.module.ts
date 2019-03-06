import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { BookSearchComponent } from './book-search.component';


@Injectable({
  providedIn: 'root'
})
export class SearchRedirectGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const q = next.params.query || '';
    const resultPerPage = +localStorage.getItem('booksPerPage') || 10;
    this.router.navigateByUrl(`/search/${q}/1/${resultPerPage}`);
    return false;
  }
}

export const routes: Routes = [
  { path: '', component: BookSearchComponent },
  { path: ':query', canActivate : [SearchRedirectGuard] },
  { path: ':query/:page/:limit', component: BookSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookSearchRoutingModule { }
