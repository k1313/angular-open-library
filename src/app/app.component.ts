import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { menuItemAnim} from './animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ menuItemAnim ]
})
export class AppComponent {
  title = 'books-app';
  layoutChanges: Observable<BreakpointState>;
  bigPanel = window.innerWidth > 900;

  navLinks = [
    { path: "/", label: "APP.HOME" },
    { path: "/favourites", label: "APP.FAVOURITES" }
  ];
  menuCollapsed: boolean = true;

  constructor(public translate: TranslateService, private breakpointObserver: BreakpointObserver) {
    translate.addLangs(['en', 'ru']);
    console.log('language', localStorage.getItem('language'));
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(localStorage.getItem('language') || 'en');

    this.layoutChanges = breakpointObserver.observe([
      '(min-width: 900px)',
    ]);

    this.layoutChanges.subscribe(result => {
      this.bigPanel = result.matches;
      if (this.bigPanel) {
        this.menuCollapsed = true;
      }
    });


  }

  toggleMenu(): void {
    this.menuCollapsed = !this.menuCollapsed;
  }

  setLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }



}
