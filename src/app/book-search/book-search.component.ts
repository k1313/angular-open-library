import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {OpenLibraryBookWrapper, OpenLibrarySearchResponseWrapper} from '../open-library-book';
import {OpenLibraryAPIService} from '../open-library-api.service';
import {filter} from 'rxjs/operators';
import {getColumns, updateColumns, ColumnData} from './columns';
import {FormControl} from '@angular/forms';

import {PageEvent} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  columnsFormControl = new FormControl();
  subjectsFormControl = new FormControl();
  columns = getColumns();
  displayedColumns: string[] = getDisplayedColumns(this.columns);

  pageSize = 10;
  page = 0;
  resultCount = 0;
  loading = false;
  query = '';

  docs: OpenLibraryBookWrapper[] = [];
  subjects: string[] = [];

  private subscriptions: Subscription;

  constructor(
    private route: ActivatedRoute,
    private api: OpenLibraryAPIService,
    private router: Router,
    public translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.query = params['query'] || '';
      this.page = +params['page'] - 1 || 0;
      this.pageSize = +params['limit'] || +localStorage.getItem('booksPerPage') || 10;
    });

    this.columnsFormControl.setValue(this.displayedColumns);
    const navEnd = this.router.events.pipe(filter(e => e instanceof NavigationEnd)) as Observable<NavigationEnd>;
    this.subscriptions = navEnd.subscribe(_ => this.performQuery());
    this.performQuery();
  }

  searchSubjects() {
    this.query = this.subjectsFormControl.value;
    this.router.navigateByUrl(`/search/subject:${this.q}/1/${this.pageSize}`);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  performQuery() {
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

  viewBookDetails(row) {
    const id = row.olid;
    this.router.navigateByUrl(`book/${id}`);
  }

  private get q(): string {
    return encodeURIComponent(this.query).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));
  }

  pageEvent(pageEvent: PageEvent) {
    const prevSize = this.pageSize;
    this.pageSize = pageEvent.pageSize;
    this.page = prevSize === this.pageSize ? pageEvent.pageIndex : 0;
    if (prevSize !== this.pageSize) {
      localStorage.setItem('booksPerPage', this.pageSize.toString());
    }
    this.router.navigateByUrl(`/search/${this.q}/${this.page + 1}/${this.pageSize}`);
  }

  doSearch() {
    this.router.navigateByUrl(`/search/${this.q}/1/${this.pageSize}`);
  }

  changeVisibleFields() {
    this.columns = updateColumns(this.columnsFormControl.value);
    this.displayedColumns = getDisplayedColumns(this.columns);
  }
}

function getDisplayedColumns(data: ColumnData[]): string[] {
  return data.filter(x => x.enabled).map(x => x.key);
}
