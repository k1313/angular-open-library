import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { OpenLibrarySearchResponse, BookDetails, OpenLibrarySearchResponseWrapper } from './open-library-book';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryAPIService {

  private searchUrl : string = 'http://openlibrary.org/search.json';
  private bookUrlPrefix: string = 'https://openlibrary.org/works/';
  
  constructor(private http: HttpClient) { }

  search(query: string, limit: number = 10, page: number = 1 ) : Observable<OpenLibrarySearchResponseWrapper> {
    if (query === '') {
      return of(new OpenLibrarySearchResponseWrapper());
    }
    const options = {
      params: new HttpParams()
        .set('q', query)
        .set('page', page.toString())
        .set('limit', limit.toString())
      };
    return this.http.get<OpenLibrarySearchResponse>(this.searchUrl, options)
      .pipe(
        retry(3),
        tap(data => console.log('search results:', data)),
        catchError(this.handleError),
        map(x => new OpenLibrarySearchResponseWrapper(x))
      );
  }

  bookDetails(id: string) : Observable<BookDetails> {
    const url = `${this.bookUrlPrefix}${id}.json`;
    return this.http.get<BookDetails>(url).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

