import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { OpenLibrarySearchResponse, OpenLibraryBook, BookCoverURLs } from './open-library-book';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryAPIService {

  private searchUrl : string = 'http://openlibrary.org/search.json';
  
  constructor(private http: HttpClient) { }

  search(query: string, limit: number = 5, page: number = 1 ) : Observable<OpenLibrarySearchResponse> {
    const options = {
      params: new HttpParams()
        .set('q', query)
        .set('page', page.toString())
        .set('limit', limit.toString())
      };
    return this.http.get<OpenLibrarySearchResponse>(this.searchUrl, options)
      .pipe(catchError(this.handleError));
  }

  getCovers(book: OpenLibraryBook) : OpenLibraryBook {
    let key: string = '';
    if (book.cover_i) {
      key = book.cover_i.toString();
    } else if (book.isbn) {
      key = book.isbn[0];
    }
    
    book._covers = {
      small: `http://covers.openlibrary.org/b/id/${key}-S.jpg`,
      medium: `http://covers.openlibrary.org/b/id/${key}-M.jpg`,
      large: `http://covers.openlibrary.org/b/id/${key}-L.jpg`,
    }
    return book;
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


