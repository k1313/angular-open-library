import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { OpenLibraryAPIService } from '../open-library-api.service';
import { OpenLibraryBookDetailsWrapper } from '../open-library-book';
import { MatChipInputEvent } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { getTags, saveTags } from '../tags';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  bookId: string = ''
  bookDetails: OpenLibraryBookDetailsWrapper;

  //tags
  tags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private route: ActivatedRoute,
    private api: OpenLibraryAPIService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = params['id'] || '';
      if (this.bookId) {
        this.api.bookDetails(this.bookId).subscribe(x => {
          this.bookDetails = x;
          console.log('x', x);
        });
        this.tags = getTags(this.bookId);
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
      this.tags = Array.from(new Set(this.tags));
      saveTags(this.bookId, this.bookDetails.obj.title, this.tags);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    saveTags(this.bookId, this.bookDetails.obj.title, this.tags);
  }
}
