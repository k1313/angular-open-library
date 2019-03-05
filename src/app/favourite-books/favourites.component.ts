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
  allSelected = this._allSelected();
  
  private _allSelected() : boolean {

    return (this.tagsSelected.length == this.allTags.length) && this.tagsSelected.length > 0;
  }

  toggleAll() : void {
    if (this.allSelected) {
      this.tagsSelected = [];
    } else {
      this.tagsSelected = allTags();
    }
    this.allSelected = this._allSelected();
    this.update();
    this.updateTags();
    
  }

  constructor(public translate: TranslateService) { }


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
      this.update();
      this.updateTags();
    }

  private update() {
    this.founded = search(this.tagsSelected);
    localStorage.setItem('selected-tags', JSON.stringify(this.tagsSelected));
    this.allSelected = this._allSelected();
  }
}

interface Tag {
  selected: boolean;
  name: string;
}