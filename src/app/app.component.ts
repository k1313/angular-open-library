import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'books-app';
  
  navLinks = [
    {path: "/", label: "APP.HOME"},
    {path: "/favourites", label: "APP.FAVOURITES"}
  ];

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    console.log('language', localStorage.getItem('language'));  
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(localStorage.getItem('language') || 'en');

  }

  setLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }



}
