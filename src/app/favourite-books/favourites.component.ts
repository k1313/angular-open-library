import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FavouriteBook, allTags, search } from '../tags';

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
