import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FavouriteBook, allTags, search } from '../tags';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  tagsSelected: string[] = [];
  allTags : string[] = allTags();
  tags : Tag[] = [];
  founded: FavouriteBook[] = [];

  constructor(public translate: TranslateService) { }

  tagSelected(tag: string) {
    return this.tagsSelected.indexOf(tag) > -1;
  }

  ngOnInit() {
    this.tagsSelected = JSON.parse(localStorage.getItem('selected-tags')) || [];
    this.founded = search(this.tagsSelected);
    this.updateTags();
  }

  updateTags() : void {
    this.tags = this.allTags.map( x => {
      return {
        selected: this.tagsSelected.indexOf(x) > -1,
        name: x
      }
    });
  }

  toggleTag(tag: string) : void {
      let idx = this.tagsSelected.indexOf(tag);
      if (idx > -1) {
        this.tagsSelected = this.tagsSelected.filter(x => x !== tag);
      } else {
        this.tagsSelected.push(tag);
      }
      this.founded = search(this.tagsSelected);
      localStorage.setItem('selected-tags', JSON.stringify(this.tagsSelected));
      this.updateTags();
    }
}

interface Tag {
  selected: boolean;
  name: string;
}