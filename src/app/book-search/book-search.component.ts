import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OpenLibraryBookWrapper, OpenLibrarySearchResponseWrapper } from '../open-library-book';
import { OpenLibraryAPIService } from '../open-library-api.service';
import { filter } from 'rxjs/operators';
import { getColumns, updateColumns, ColumnData } from './columns';
import { FormControl } from '@angular/forms';

import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  columnsFormControl = new FormControl();
  columns = getColumns();
  displayedColumns: string[] = getDisplayedColumns(this.columns);

  pageSize=10;
  page = 0;
  resultCount = 0;
  loading = false;
  query ='';
 
  docs : OpenLibraryBookWrapper[] = [];
  subjects : string[] = [];

  private subscriptions : Subscription;

  constructor(
    private route: ActivatedRoute, 
    private api: OpenLibraryAPIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.query = params['query'] || '';
      this.page = +params['page'] - 1 || 0;
      this.pageSize = +params['limit'] || +localStorage.getItem('booksPerPage') || 10;
    });
    
    this.columnsFormControl.setValue(this.displayedColumns);    
    let navEnd = this.router.events.pipe( filter(e => e instanceof NavigationEnd)) as Observable<NavigationEnd>;
    this.subscriptions = navEnd.subscribe(_ => this.performQuery());
    this.performQuery();
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private performQuery() {
    this.loading = true;
    this.api.search(this.query, this.pageSize, this.page + 1).subscribe(
      (response: OpenLibrarySearchResponseWrapper) => {
        this.docs = response.docs;
        this.subjects = response.subjects;
        this.resultCount = response.numFound;
        this.loading = false;
      }
    );
  }

  private viewBookDetails(row) {
    let s = row.obj.key.split('/');
    let id = s[s.length - 1];
    if (id) {
      this.router.navigateByUrl(`book/${id}`);
    } else {
      console.error('bad book id');
    }
  }
  
  private pageEvent(pageEvent: PageEvent) {
    let prevSize = this.pageSize;
    this.pageSize = pageEvent.pageSize;
    this.page = prevSize == this.pageSize ? pageEvent.pageIndex : 0;
    if (prevSize !== this.pageSize) {
      localStorage.setItem('booksPerPage', this.pageSize.toString());
    }
    this.router.navigateByUrl(`/search/${this.query}/${this.page+1}/${this.pageSize}`);
  }

  private doSearch() {
    this.router.navigateByUrl(`/search/${this.query}/1/${this.pageSize}`);
  }

  private changeVisibleFields() {
    this.columns = updateColumns(this.columnsFormControl.value);
    this.displayedColumns = getDisplayedColumns(this.columns);
  }
}

function getDisplayedColumns(data: ColumnData[]): string[] {
  return data.filter(x => x.enabled).map(x => x.key);
}