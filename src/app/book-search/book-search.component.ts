import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { OpenLibraryBook, OpenLibrarySearchResponse } from '../open-library-book';
import { OpenLibraryAPIService } from '../open-library-api.service';
import { filter } from 'rxjs/operators';
import { getColumns, toggleColumn, ColumnData, updateColumns } from './columns';
import { FormControl } from '@angular/forms';
import h from './helpers';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  columnsFormControl = new FormControl();
  columns: ColumnData[];
  pageSize=10;
  page = 0;
  resultCount = 0;

  query: string = '';
  
  displayedColumns: string[];
  docs : OpenLibraryBook[] = [];

  subjects : string[] = [];

  
  private navStart: Observable<NavigationStart>;
  private navEnd: Observable<NavigationEnd>;

  constructor(
    private route: ActivatedRoute, 
    private api: OpenLibraryAPIService,
    private router: Router
  ) {
    this.navStart = router.events.pipe(filter(e => e instanceof NavigationStart)) as Observable<NavigationStart>;
    this.navEnd = router.events.pipe(filter(e => e instanceof NavigationEnd)) as Observable<NavigationEnd>
   }



  ngOnInit() {
    this.route.params.subscribe(params => this.query = params['query'] || '');
    this.performQuery();
    this.columns = getColumns();
    this.displayedColumns = h.getDisplayedColumns(this.columns);
    this.columnsFormControl.setValue(this.displayedColumns);
    
    this.navEnd.subscribe(() => {
      console.log('nav end');
      this.performQuery();
    });

    

    this.navStart.subscribe(() => {
      console.log('nav start');
    })

    
  }

  toggleColumn(name: string) : void {
    toggleColumn(name);
  }


  private performQuery() {
    this.api.search(this.query, this.pageSize, this.page + 1).subscribe(
      (response: OpenLibrarySearchResponse) => {
        this.docs = response.docs.map(obj => h.addCovers(obj) );
        this.subjects = h.getSubjects(this.docs);
        this.resultCount = response.numFound;
        console.log(this.resultCount);
      }
    );
  }

  
  private pageEvent(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.page = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.performQuery();
  }

  doSearch() {
    this.router.navigateByUrl(`/search/${this.query}`);
  }

  changeVisibleFields() {
    this.columns = updateColumns(this.columnsFormControl.value);
    this.displayedColumns = h.getDisplayedColumns(this.columns);
  }
}


