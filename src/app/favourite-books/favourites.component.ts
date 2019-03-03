import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  tagsSelected: string[] = [];
  tags : string[] = allTags();
  tagsFormControl = new FormControl();

  founded: FavouriteBook[] = [];
  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.tagsSelected = JSON.parse(localStorage.getItem('selected-tags')) || [];
    this.tagsFormControl.setValue(this.tagsSelected);
    this.founded = search(this.tagsSelected);
  }

  tagsChanged() {
    this.tagsSelected = this.tagsFormControl.value;
    this.founded = search(this.tagsSelected);
    localStorage.setItem('selected-tags', JSON.stringify(this.tagsSelected));
  }

}

interface FavouriteBook {
  id : string;
  title: string;
  tags: string[];
}

function allTags() : string[] {
  let favourites : FavouriteBook[] = JSON.parse(localStorage.getItem('favourites')) || [];
  let all = favourites.reduce( (p,c) => [...p, ...c.tags], []);
  return Array.from(new Set(all));
}

function search(tags: string[]) : FavouriteBook[] {
  let favourites : FavouriteBook[] = JSON.parse(localStorage.getItem('favourites')) || [];
  return favourites.filter(x => {
    for (let t of tags) {
      if (x.tags.indexOf(t) > -1) {
        return true;
      }
    }
    return false;
  })
}