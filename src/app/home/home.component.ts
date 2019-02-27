import { Component, OnInit } from '@angular/core';
import { OpenLibraryBook, OpenLibrarySearchResponse } from '../open-library-book';
import { OpenLibraryAPIService } from '../open-library-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['author_name', 'title', 'isbn'];
  docs : OpenLibraryBook[] = [];
  query : string = 'hobbit';
  subjects : string[] = [];

  constructor(private api: OpenLibraryAPIService) {}

  ngOnInit() {
    this.api.search(this.query).subscribe(
      (response: OpenLibrarySearchResponse) => {
        this.docs = response.docs.map(obj => this.api.getCovers(obj) );
        this.subjects = [];
        this.docs.forEach( (v, i, a) => {
          this.subjects = this.subjects.concat(v.subject);
        });
        this.subjects = this.subjects.filter( x => !!x);
        console.log(this.docs);
      }
    );
  }

}
